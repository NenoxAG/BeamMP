--====================================================================================
-- All work by Titch2000 and jojos38.
-- You have no permission to edit, redistribute or upload. Contact us for more info!
--====================================================================================
local ver = split(beamng_versionb, ".")
local majorVer = tonumber(ver[2])
local compatibleVersion = 31
if majorVer ~= compatibleVersion then
	log('W', 'versionCheck', 'BeamMP is incompatible with BeamNG.drive version '..beamng_versionb)
	log('M', 'versionCheck', 'Deactivating BeamMP mod.')
	core_modmanager.deactivateMod('multiplayerbeammp')
	core_modmanager.deactivateMod('beammp')
	if majorVer > compatibleVersion then
		guihooks.trigger("toastrMsg", {type="error", title="Error loading BeamMP", msg="BeamMP is currently not compatible with BeamNG.drive version "..beamng_versionb..". Check the BeamMP Discord for updates."})
		log('W', 'versionCheck', 'BeamMP is currently not compatible with BeamNG.drive version '..beamng_versionb..'. Check the BeamMP Discord for updates.')
	else
		guihooks.trigger("toastrMsg", {type="error", title="Error loading BeamMP", msg="BeamMP is not compatible with BeamNG.drive version "..beamng_versionb.. ". Please update your game."})
		log('W', 'versionCheck', 'BeamMP is not compatible with BeamNG.drive version '..beamng_versionb.. '. Please update your game.')
	end
	return
else
	log('M', 'versionCheck', 'BeamMP is compatible with the current version.')
end

load("multiplayer/multiplayer")
setExtensionUnloadMode("multiplayer/multiplayer", "manual")

load("MPDebug")
setExtensionUnloadMode("MPDebug", "manual")

load("UI")
setExtensionUnloadMode("UI", "manual")

load("MPModManager")
setExtensionUnloadMode("MPModManager", "manual")

load("MPCoreNetwork")
setExtensionUnloadMode("MPCoreNetwork", "manual")

load("MPConfig")
setExtensionUnloadMode("MPConfig", "manual")

load("MPGameNetwork")
setExtensionUnloadMode("MPGameNetwork", "manual")

load("MPVehicleGE")
setExtensionUnloadMode("MPVehicleGE", "manual")

load("MPInputsGE")
setExtensionUnloadMode("MPInputsGE", "manual")

load("MPElectricsGE")
setExtensionUnloadMode("MPElectricsGE", "manual")

load("positionGE")
setExtensionUnloadMode("positionGE", "manual")

load("MPPowertrainGE")
setExtensionUnloadMode("MPPowertrainGE", "manual")

load("MPUpdatesGE")
setExtensionUnloadMode("MPUpdatesGE", "manual")

load("nodesGE")
setExtensionUnloadMode("nodesGE", "manual")

-- load this file last so it can reference the others
load("MPHelpers")
setExtensionUnloadMode("MPHelpers", "manual")
