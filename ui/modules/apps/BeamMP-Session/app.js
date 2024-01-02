var app = angular.module('beamng.apps');
var mdDialog;
var mdDialogVisible = false;

app.directive('multiplayersession', [function () {
	return {
		templateUrl: '/ui/modules/apps/BeamMP-Session/app.html',
		replace: true,
		restrict: 'EA',
		scope: true,
		controllerAs: 'ctrl'
	}
}]);

app.controller("Session", ['$scope', '$mdDialog', function ($scope, $mdDialog) {
	$scope.init = function() {
		bngApi.engineLua('UI.setServerName()'); // request server name
		bngApi.engineLua('UI.sendQueue()'); // request queue data
		//TODO: ping request to instantly populate the player count
	};

	mdDialog = $mdDialog;

	$scope.mpquit = function() {
		bngApi.engineLua('MPCoreNetwork.leaveServer(true)');
	};

	$scope.applyQueue = function() {
		bngApi.engineLua('MPVehicleGE.applyQueuedEvents()');
	};

	$scope.reset = function() {
		$scope.init();
	};

	$scope.select = function() {
		bngApi.engineLua('setCEFFocus(true)');
	};

	$scope.$on('showMdDialog', function (event, data) {
		switch(data.dialogtype) {
			case "alert":
				if (mdDialogVisible) { return; }
				console.log(data);

				// escape data.text <, > and &
				data.text = data.text.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');

				// replace ^p with <br>
				data.text = data.text.replace(/\^p/g, '</br>');

				console.log(mdDialogVisible);
				mdDialogVisible = true;

				$mdDialog.show({
				  template:
				  	'<md-dialog>' +
						'  <md-dialog-content style="color: white;">' +
						'    <h2 class="md-title">' + data.title + '</h2>' +
						'    <p>' + data.text + '</p>' +
						'  </md-dialog-content>' +
						'  <div class="md-actions">' +
						'    <md-button ng-click="dialog.hide()" class="md-primary">' +
						'      ' + data.okText +
				    '    </md-button>' +
				    '  </div>' +
				    '</md-dialog>',
				}).then(function() {
					mdDialogVisible = false;
					if (data.okJS !== undefined) { eval(data.okJS); return; }
					else if (data.okLua !== undefined) { bngApi.engineLua(data.okLua); return; }
				}, function() { mdDialogVisible = false; });
				break;
		}
	});

	$scope.$on('setPing', function (event, ping) {
		var sessionPing = document.getElementById("Session-Ping")
		// To ensure that the element exists
		if (sessionPing) {
			sessionPing.innerHTML = ping;
		}
	});

	$scope.$on('setQueue', function (event, queue) {
		var queueBlock = document.getElementById("queue-block");
		// To ensure that the element exists
		if (queueBlock) {
			if (queue.show) {
				queueBlock.style["background-position"] = "0%";
				queueBlock.style.display = "";
			} else {
				queueBlock.style.display = "none";
				return;
			}
		}

		var queueCount = queue.editCount + queue.spawnCount;
		var queueElem = document.getElementById("Session-Queue")
		queueElem.innerHTML = `${queue.spawnCount}|${queue.editCount}`;
		queueElem.title = `Edits: ${queue.editCount}\nSpawns: ${queue.spawnCount}`; // titles dont work in game :C

	});

	$scope.$on('setAutoQueueProgress', function (event, progress) {
		document.getElementById('queue-block').style["background-position"] = progress + "%";
	});

	$scope.$on('setServerName', function (event, data) {
		//console.log('Setting status to: ' + sanitizeString(status))
		if (!data) document.getElementById("server-name-block").style.display = "none";
		else {
			document.getElementById("server-name-block").style.display = "";
			document.getElementById("Session-Status").innerHTML = sanitizeString(data); // DISPLAY SERVER NAME FORMATTING
		}
	});

	$scope.$on('setPlayerCount', function (event, count) {
		document.getElementById("Session-PlayerCount").innerHTML = count;
	});
}]);

function sanitizeString(str) {  // VERY basic sanitization.
	str = str.replace(/<script.*?<\/script>/g, '');
	str = str.replace(/<button.*?<\/button>/g, '');
	str = str.replace(/<iframe.*?<\/iframe>/g, '');
	str = str.replace(/<a.*?<\/a>/g, '');
    return str
}
