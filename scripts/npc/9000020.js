/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
status = -1;

var bossmaps = Array(100000005, 105070002, 105090900, 230040420, 280030000, 220080001, 240020402, 240020101, 801040100, 240060200, 610010005, 610010012, 610010013, 610010100, 610010101, 610010102, 610010103, 610010104); // Someone else's House, The Grave of Mushmom, The cursed Sanctuary, The Cave of Pianus, Zakums Altar, Origin of Clocktower, Manons Forest, Griffey Forest, The Nightmarish Last Days, Horntails Cave, Bigfoot- Phantom Forest-Forgotten Path, Phantom Forest-Evil Rising, Phantom Forest-The Evil Dead, Phantom Forest-Twisted Path 1, Phantom Forest-Twisted Path 2, Phantom Forest-Twisted Path 3, Phantom Forest-Twisted Path 4, Phantom Forest-Twisted Path 5
var monstermaps = Array(100040001, 101010100, 104040000, 103000101, 103000105, 101030110, 106000002, 101030103, 101040001, 101040003, 101030001, 104010001, 105070001, 105090300, 105040306, 230020000, 230010400, 211041400, 222010000, 220080000, 220070301, 220070201, 220050300, 220010500, 250020000, 251010000, 200040000, 200010301, 240020100, 240040500, 240040000, 600020300, 801040004, 800020130); // Dungeon Southern Forest I, Tree that Grew 1, Henesys Hunting Ground 1, Line 1 Area 1, Line 1 Area 4, Camp 1, Dangerous Valley II, Excavation Site III, Land of Wild Boar, Iron Boar Land, The Land of Wild Boar II, The Pig Beach, Ant Tunnel Park, Drakes Meal Table, The Forest of Golem, Forked Road: East Sea, Forked Road: West Sea, Forest of Dead Trees 4, Entrance to Black Mountain, Deep Inside the Clock Tower, Forbidden Time, Lost Time, Path of Time, Terrace Hall, Practice Field, Beginner, 10-Year-Old Herb Garden, Cloud Park 3, Garden of Darkness 1, Battlefield of Fire & Darkness, Entrance to Dragon Nest, The Dragon Canyon, Wolf Spider Cavern, Armory, Encounter with the Budda, 
var townmaps = Array(680000000, 230000000, 101000000, 211000000, 100000000, 251000000, 103000000, 222000000, 104000000, 240000000, 220000000, 250000000, 800000000, 600000000, 221000000, 200000000, 102000000, 801000000, 105040300, 610010004, 260000000, 540010000, 120000000); // Amoria, Aquarium, Ellinia, El Nath, Henesys, Herb Town, Kerning City, Korean Folk Town, Leafre, Lith Harbor, Ludibrium, Mu Lung, Mushroom Shrine, New Leaf City, Omega Sector, Orbis, Perion, Showa Town, Sleepywood, Crimsonwood, Ariant, Singapore, Nautilus Port
var chosenMap;
var typee;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		if (status == 3 && mode == 0)
			cm.sendNext("Please don't waste my time, I'm a busy whore.");
		cm.dispose();
		return;
	}
	
	if (status == 0) {
		cm.sendNext("Hi ! I can teleport you anywhere..");
	} if (status == 1) {
		cm.sendSimple("#fUI/UIWindow.img/QuestIcon/3/0#\r\n#L0#Towns#l\r\n#L1#Monster Maps#l\r\n#L2#Boss Maps#l");
	} else if (status == 2) {
		if (selection == 0)
			typee = townmaps;
		else if (selection == 1)
			typee = monstermaps;
		else
			typee = bossmaps;
			
		var selStr = "Select your destination.#b";
		for (var i = 0; i < typee.length; i++) {
			selStr += "\r\n#L" + i + "##m" + typee[i] + "#";
		}
		cm.sendSimple(selStr);
	} else if (status == 3) {
		chosenMap = typee[selection];
		cm.sendYesNo("Do you want to go to #m" + chosenMap + "#?");
	} else if (status == 4) {
		cm.warp(chosenMap, 0);
		cm.dispose();
	}
}


// var travelFrom = [777777777, 541000000];
// var travelFee = [3000, 10000];

// var travelMap = [800000000, 550000000];
// var travelPlace = ["Mushroom Shrine of Japan", "Trend Zone of Malaysia"];
// var travelPlaceShort = ["Mushroom Shrine", "Metropolis"];
// var travelPlaceCountry = ["Japan", "Malaysia"];
// var travelAgent = ["I", "#r#p9201135##k"];

// var travelDescription = ["If you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times.",
//                         "If you desire to feel the heat of the tropics on an upbeat environment, the residents of Malaysia are eager to welcome you. Also, the metropolis itself is the heart of the local economy, that place is known to always offer something to do or to visit around."];

// var travelDescription2 = ["Check out the female shaman serving the Mushroom God, and I strongly recommend trying Takoyaki, Yakisoba, and other delocious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one.",
//                         "Once there, I strongly suggest you to schedule a visit to Kampung Village. Why? Surely you've come to know about the fantasy theme park Spooky World? No? It's simply put the greatest theme park around there, it's worth a visit! Now, let's head over to the #bTrend Zone of Malaysia#k."];

// var travelType;
// var travelStatus;

// function start() {
//     travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
//     action(1,0,0);
// }

// function getTravelingStatus(mapid) {
//     for(var i = 0; i < travelMap.length; i++) {
//         if(mapid == travelMap[i]) {
//             return i;
//         }
//     }
    
//     return -1;
// }

// function getTravelType(mapid) {
//     for(var i = 0; i < travelFrom.length; i++) {
//         if(mapid == travelFrom[i]) {
//             return i;
//         }
//     }
    
//     return 0;
// }

// function action(mode, type, selection) {
//     status++;
//     if(mode != 1){
//         if(mode == 0 && status == 4)
//             status -= 2;
//         else{
//             cm.dispose();
//             return;
//         }
//     }
    
//     if (travelStatus != -1) {
//         if (status == 0) 
//             cm.sendSimple("How's the traveling? Are you enjoying it?#b\r\n#L0#Yes, I'm done with traveling. Can I go back to #m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#?\r\n#L1#No, I'd like to continue exploring this place.");
//         else if (status == 1) {
//             if (selection == 0) {
//                 cm.sendNext("Alright. I'll take you back to where you were before the visit to Japan. If you ever feel like traveling again down the road, please let me know!");
//             } else if (selection == 1) {
//                 cm.sendOk("OK. If you ever change your mind, please let me know.");
//                 cm.dispose();
//             }
//         } else if (status == 2) {
//             var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
//             if (map == -1) map = 104000000;
            
//             cm.warp(map);
//             cm.dispose();
//         }
//     } else {
//         if (status == 0) {
//             travelType = getTravelType(cm.getPlayer().getMapId());
//             cm.sendNext("If you're tired of the monotonous daily life, how about getting out for a change? there's nothing quite like soaking up a new culture, learning something new by the minute! It's time for you to get out and travel. We, at the Maple Travel Agency recommend you going on a #bWorld Tour#k! Are you worried about the travel expense? You shouldn't be! We, the #bMaple Travel Agency#k, have carefully come up with a plan to let you travel for ONLY #b" + cm.numberWithCommas(travelFee[travelType]) + " mesos#k!");
//         } else if (status == 1) {
//             cm.sendSimple("We currently offer this place for you traveling pleasure: #b" + travelPlace[travelType] + "#k. " + travelAgent[travelType] + "'ll be there serving you as the travel guide. Rest assured, the number of destinations will be increase over time. Now, would you like to head over to the " + travelPlaceShort[travelType] + "?#b\r\n#L0#Yes, take me to " + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
//         } else if (status == 2) {
//             cm.sendNext("Would you like to travel to #b" + travelPlace[travelType] + "#k? " + travelDescription[travelType]);
//         } else if (status == 3) {
//             if(cm.getMeso() < travelFee[travelType]){
//                 cm.sendNext("You don't have enough mesos to take the travel.");
//                 cm.dispose();
//                 return;
//             }
//             cm.sendNextPrev(travelDescription2[travelType]);
//         } else if (status == 4) {
//             cm.gainMeso(-travelFee[travelType]);
//             cm.getPlayer().saveLocation("WORLDTOUR");
//             cm.warp(travelMap[travelType], 0);
//             cm.dispose();
//         }
//     }
// }