Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param(
        [string]$Src,
        [int]$MaxWidth,
        [string]$Format,
        [int]$Quality = 85
    )
    
    if (-not (Test-Path $Src)) {
        Write-Host "File not found: $Src"
        return
    }

    $rawFile = [System.IO.File]::ReadAllBytes($Src)
    $ms = New-Object System.IO.MemoryStream(,$rawFile)
    $original = [System.Drawing.Bitmap]::FromStream($ms)

    $ratio = $MaxWidth / $original.Width
    if ($ratio -ge 1.0) {
        Write-Host "Image $Src is already smaller than $MaxWidth px"
        $original.Dispose()
        $ms.Dispose()
        return
    }
    
    $newWidth = [int]($original.Width * $ratio)
    $newHeight = [int]($original.Height * $ratio)
    
    $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($resized)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $graphics.DrawImage($original, 0, 0, $newWidth, $newHeight)
    $original.Dispose()
    $graphics.Dispose()
    $ms.Dispose()
    
    $tempFile = $Src + '.tmp'
    if ($Format -eq 'PNG') {
        $resized.Save($tempFile, [System.Drawing.Imaging.ImageFormat]::Png)
    } elseif ($Format -eq 'JPEG') {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
        $resized.Save($tempFile, $codec, $encoderParams)
        $encoderParams.Dispose()
    }
    $resized.Dispose()
    
    Move-Item -Path $tempFile -Destination $Src -Force
    $newSize = (Get-Item $Src).Length
    Write-Host "Optimized $Src -> $newWidth x $newHeight ($([math]::Round($newSize/1KB, 1)) KB)"
}

Optimize-Image -Src 'public/images/extracted/pak-ricky.png' -MaxWidth 600 -Format 'PNG'
Optimize-Image -Src 'public/images/escalator-inspection.jpg' -MaxWidth 1000 -Format 'JPEG' -Quality 85
Optimize-Image -Src 'public/images/forklift-inspection.jpg' -MaxWidth 1000 -Format 'JPEG' -Quality 85
