lib.locale()

local isInZone = false
local currentJob = nil

function openJobCenter()
    if not isInZone then return end

    if not IsNuiFocused() then
        lib.requestAnimDict("amb@code_human_in_bus_passenger_idles@female@tablet@base")
        while not HasAnimDictLoaded("amb@code_human_in_bus_passenger_idles@female@tablet@base") do
            Wait(100)
        end

        lib.playAnim(cache.ped, "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 8.0, -8.0, -1, 49, 0, false, false, false)

        currentJob = lib.callback.await('joblisting:getCurrentJob', false)

        local jobs = lib.callback.await('joblisting:getJobs', false)

        if jobs then
            SendNUIMessage({
                type = "displayJobs",
                jobs = jobs,
                currentJob = currentJob
            })
            SetNuiFocus(true, true)
        end
    end
end

function closeUI()
    if IsNuiFocused() then
        ClearPedTasks(cache.ped)
        SetNuiFocus(false, false)
        SendNUIMessage({ type = "hideUI" })
    end
end

RegisterNUICallback('closeUI', function(_, cb)
    closeUI()
    cb('ok')
end)

RegisterNUICallback('selectJob', function(data, cb)
    local jobName = data.jobName
    TriggerServerEvent('joblisting:applyJob', jobName)

    closeUI()
    cb('ok')
end)

RegisterNetEvent('joblisting:forceCloseUI', function()
    closeUI()
end)

for _, zone in pairs(Config.JobCenters) do
    lib.zones.box({
        coords = zone.coords, 
        size = zone.size, 
        rotation = zone.rotation, 
        debug = zone.debug, 
        onEnter = function()
            isInZone = true
            lib.showTextUI(locale('text_ui'), { position = "left-center", icon = "briefcase" })
        end,
        onExit = function()
            isInZone = false
            lib.hideTextUI()
        end,
        inside = function()
            if IsControlJustReleased(0, 38) and isInZone then
                openJobCenter()
            end
        end
    })
end
