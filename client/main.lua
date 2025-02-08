-- Fungsi membuka UI Job Center
function openJobCenter()
    if not IsNuiFocused() then
        lib.requestAnimDict("amb@code_human_in_bus_passenger_idles@female@tablet@base")
        while not HasAnimDictLoaded("amb@code_human_in_bus_passenger_idles@female@tablet@base") do
            Wait(100)
        end

        lib.playAnim(cache.ped, "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 8.0, -8.0, -1, 49, 0, false, false, false)

        -- ✅ Gunakan lib.callback.await() untuk mengambil data pekerjaan dari server
        local jobs = lib.callback.await('joblisting:getJobs', false)

        if jobs then
            SendNUIMessage({
                type = "displayJobs",
                jobs = jobs
            })
            SetNuiFocus(true, true)
        end
    end
end

-- Fungsi menutup UI dengan benar
function closeUI()
    if IsNuiFocused() then
        ClearPedTasks(cache.ped)
        SetNuiFocus(false, false)
        SendNUIMessage({ type = "hideUI" })
    end
end

-- Event dari NUI untuk menutup UI
RegisterNUICallback('closeUI', function(_, cb)
    closeUI()
    cb('ok')
end)

-- Event saat memilih pekerjaan
RegisterNUICallback('selectJob', function(data, cb)
    local jobName = data.jobName
    TriggerServerEvent('joblisting:applyJob', jobName)

    closeUI()
    cb('ok')
end)

-- Event untuk memaksa menutup UI dari server
RegisterNetEvent('joblisting:forceCloseUI')
AddEventHandler('joblisting:forceCloseUI', function()
    closeUI()
end)

-- **Gunakan ox_lib untuk zona interaksi**
for _, zone in pairs(Config.JobCenters) do
    lib.zones.box({
        coords = zone.coords, 
        size = zone.size, 
        rotation = zone.rotation, 
        debug = zone.debug, 
        onEnter = function()
            lib.showTextUI("[E] Buka Job Center", { position = "left-center", icon = "briefcase" })
        end,
        onExit = function()
            lib.hideTextUI()
        end,
        inside = function()
            if IsControlJustReleased(0, 38) then
                openJobCenter()
            end
        end
    })
end
