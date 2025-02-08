ESX = exports['es_extended']:getSharedObject()

-- ✅ Gunakan lib.callback.register() untuk menggantikan ESX.RegisterServerCallback()
lib.callback.register('joblisting:getJobs', function(source)
    local jobs = {}

    for jobName, jobData in pairs(Config.Jobs) do
        table.insert(jobs, {
            name = jobName,
            label = jobData.label,
            image = jobData.image or Config.DefaultImage
        })
    end

    -- **Urutkan berdasarkan label (A-Z)**
    table.sort(jobs, function(a, b) return a.label < b.label end)

    return jobs -- ✅ Langsung return, tidak perlu cb(jobs)
end)

-- Event untuk mengubah pekerjaan pemain
RegisterServerEvent('joblisting:applyJob')
AddEventHandler('joblisting:applyJob', function(job)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)

    if xPlayer and ESX.DoesJobExist(job, 0) then
        xPlayer.setJob(job, 0)

        -- ✅ Gunakan ox_lib untuk notifikasi yang lebih ringan
        TriggerClientEvent('ox_lib:notify', src, {
            title = 'Job Center',
            description = 'Pekerjaan kamu sekarang: ' .. job,
            type = 'success',
            position = 'top-right',
            duration = 5000
        })

        -- ✅ Paksa UI tertutup setelah mengambil pekerjaan
        TriggerClientEvent('joblisting:forceCloseUI', src)
    else
        TriggerClientEvent('ox_lib:notify', src, {
            title = 'Job Center',
            description = 'Pekerjaan tidak valid!',
            type = 'error',
            position = 'top-right',
            duration = 5000
        })
    end
end)
