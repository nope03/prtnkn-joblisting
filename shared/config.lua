Config = {}

-- Daftar pekerjaan dan gambar
Config.Jobs = {
    taxi1 = { label = "Taxi Driver", image = "https://example.com/images/taxi.png" },
    police1 = { label = "Police Officer", image = "https://example.com/images/police.png" },
    ambulance1 = { label = "EMS", image = "https://example.com/images/ambulance.png" },
    fisherman1 = { label = "Fisherman", image = "https://example.com/images/fisherman.png" },
    miner1 = { label = "Miner", image = "https://example.com/images/miner.png" },
    tailor1 = { label = "Tailor", image = "https://example.com/images/tailor.png" },
    lumberjack1 = { label = "Lumberjack", image = "https://example.com/images/lumberjack.png" },
    taxi = { label = "Taxi Driver", image = "https://example.com/images/taxi.png" },
    police = { label = "Police Officer", image = "https://example.com/images/police.png" },
    ambulance = { label = "EMS", image = "https://example.com/images/ambulance.png" },
    fisherman = { label = "Fisherman", image = "https://example.com/images/fisherman.png" },
    miner = { label = "Miner", image = "https://example.com/images/miner.png" },
    tailor = { label = "Tailor", image = "https://example.com/images/tailor.png" },
    lumberjack = { label = "Lumberjack", image = "https://example.com/images/lumberjack.png" },
    unemployed = { label = "Unemployed", image = "https://tribratanews.sulteng.polri.go.id/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-23-at-12.59.06.jpeg" }
}

Config.DefaultImage = "https://tribratanews.sulteng.polri.go.id/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-23-at-12.59.06.jpeg"

Config.JobCenters = {
    {
        coords = vec3(-267.94, -957.93, 31.22), -- Lokasi Job Center (City Hall)
        size = vec3(3.0, 3.0, 3.0), -- Ukuran zona interaksi
        rotation = 0.0, -- Rotasi zona
        debug = false -- Ubah ke false jika tidak ingin melihat kotak zona debug
    }
}