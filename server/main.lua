lib.locale()

ESX = exports['es_extended']:getSharedObject()

lib.callback.register('joblisting:getCurrentJob', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then return nil end

    return xPlayer.getJob()
end)

lib.callback.register('joblisting:getJobs', function(source)
    local jobs = {}

    for jobName, jobData in pairs(Config.Jobs) do
        table.insert(jobs, {
            name = jobName,
            label = jobData.label,
            image = jobData.image or Config.DefaultImage,
            description = jobData.description or "No description available." -- Tambahkan deskripsi pekerjaan
        })
    end

    table.sort(jobs, function(a, b) return a.label < b.label end)

    return jobs
end)

RegisterServerEvent('joblisting:applyJob')
AddEventHandler('joblisting:applyJob', function(job)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)

    if not xPlayer then return end
    if not Config.Jobs[job] then
        DropPlayer(src, 'Attempt to use an invalid job!')
        return
    end

    if xPlayer and ESX.DoesJobExist(job, 0) then
        xPlayer.setJob(job, 0)

        TriggerClientEvent('ox_lib:notify', src, {
            title = locale('tittle_notif'),
            description = locale('work_now') .. job,
            type = 'success',
            position = 'top-right',
            duration = 5000
        })

        TriggerClientEvent('joblisting:forceCloseUI', src)
    else
        TriggerClientEvent('ox_lib:notify', src, {
            title = locale('tittle_notif'),
            description = locale('work_not_valid'),
            type = 'error',
            position = 'top-right',
            duration = 5000
        })
    end
end)
