//directory is either 0 or 1. image fies are 0.png onward.
$(document).ready(function() {
	var arrayInfo= [[
		' CAMP LEJEUNE, N.C. (May 30, 2007) - U.S. Navy midshipmen press their assault against the urban terrain during career orientation training for midshipmen (CORTRAMID) at the military operations in urban terrain facility. CORTRAMID is designed to familiarize midshipmen with the missions, tasks, and equipment of the various warfare areas pertaining to surface, submarine, aviation, and Marine Corps. U.S. Marine Corps photo by Cpl. James McLaughlin',
		'Cpl. Stephen Kramer (left) signals for backup as Lance Cpl. John Pentacola (right) from Bravo Company, 1st Battalion, 8th Marines, fires his M-249 Squad Automatic Weapon at the enemy in the Military Operations in Urban Terrain facility during Urban Warrior Limited Objective Exercise 2 on April 29, 1998, at Camp Lejeune, N.C. Urban Warrior is the U.S. Marine Corps Warfighting Laboratorys series of limited objective experiments examining new urban tactics and experimental technologies. Kramer is from Markle Island, Fla., and Pentacola is from Long Island, N.Y.   DoD photo by Lance Cpl. Donald R. Storms, U.S. Marine Corps. ',
		'Reservists of the Weapons Company, 1st Battalion, 24th Marines test their urban fighting skills along a downtown street. the blade/dave zapotosky Curious and surprised spectators watch the Marine exercises downtown. James Eggleston of Elyria used his video camera to capture the military training for later viewing. ZAPOTOSKY / BLADE',
		'Marine reservists cross Erie Street at Monroe Street, weapons at the ready. The M-16A2 rifles carried only blanks. The reservists also received classroom instruction during the exercise. ZAPOTOSKY / BLADE',
		'US Army Mine Resistant Ambush Protected (MRAP) Armored Vehicle',
		'120109-N-OT964- California (09 Jan. 2012) Navy SEALs conduct training on land and in water. U.S. Navy photo by Mass Communication Specialist 2nd Class Martin L. Carey',
		' CAMPO, Calif. (Oct. 19, 2007) - A team of four SEAL trainees prepare to breach a room during a SEAL qualification training exercise. Students spend two weeks learning basic skills to secure a room from possible threats before earning their coveted SEAL trident pin. U.S. Navy photo by Mass Communication Specialist 2nd Class Christopher Menzie (RELEASED)',
		'FALLUJAH, Iraq - An assault team from B Company, 1st Battalion, 25th Marine Regiment, Regimental Combat Team 5, conducts a raid on a possible suicide vehicle bomb workshop in Fallujah. The Marines searched the vacant garage in central Fallujah after receiving intelligence that the owner might be supporting insurgents to harm Coalition forces and innocent civilians. Photo by: Cpl. Brain Reimers',
		'NEVADA TEST and TRAINING RANGE, Nev. -- U.S. Special Forces soldiers search for the daughter of a village elder during a simulated hostage situation at the Urban Operations Center on the Nevada Test and Training Range, Oct. 21, 2009. Special Forces Units from all branches of service and allied nations use the facilities on the NTTR for a multitude of different training. (U.S. Air Force photo by Tech. Sgt. Michael R. Holzworth)(released)',
		'Camp Blanding, Fla. (Feb. 18, 2005) - Aviation Warfare Systems Operator 2nd Class Amanda Egloff, left, Aviation Warfare Systems Operator 2nd Class Darien Durk, center, and safety observer Senior Chief Aviation Warfare Systems Operator Jim Zobrosky fire the M-4 Rifle during Combat Search and Rescue (CSAR) weapons qualifications. The Sailors are assigned to the "Dragonslayers" of Helicopter Anti-Submarine Squadron Eleven (HS-11). U.S. Navy photo by Photographer Mate 2nd Class Charles E. Hill (RELEASED)',
		'Soldiers conduct a cordon and search in Buhriz, Iraq.',
		'Special Forces soldiers of the 7th Special Forces Group (Airborne), armed with M4 CQBR carbines fitted with Eotech holographic sights, undergoing urban combat training at Fort Bragg. '
		],
		['A police officer monitoring people protesting the police shooting of teenager Michael Brown on Aug. 13, 2014, in Ferguson, Mo. Photo credit: Scott Olson/Getty Images ',
		'A police officer pointing a gun at people protesting the police shooting of teenager Michael Brown on Aug. 13, 2014, in Ferguson, Mo.',
		'Police confronting an unarmed black man protesting the fatal shooting of Michael Brown. Whitney Curtis / The New York Times / Redux',
		'Jefferson County SWAT team members move down a hallway during an active shooter training exercise at a school in Ketona, Ala. (Mark Almond / AP)',
		'Anchorage Police Department Special Weapons and Tactics (SWAT) Team officers train on the High-Angle Sniper Range at Joint Base Elmendorf-Richardson, Tuesday, Aug. 28, 2012.  photo by Justin Connaher',
		'The Vermont State Police have acquired a Lenco G3 armored truck. The vehicle cost $255,398 with $189,400 coming from Homeland Security grants. Photo: Vermont State Police.',
		"Dallas County Sheriffs Department's MRAP (Mine-Resistant Ambush Protected) vehicle. Credit: Dallas County Sheriff’s Department",
		'KLAMATH FALLS, OREGON - May 15, 2013 - Members of the Oregon State Police prepare to participate in a wide sweeping raid in Southern Oregon. (photo by Bruce Ely / The Oregonian)',
		'Heavily armed state police kept gawkers at bay during a May raid on an alleged fake ID ring. photo: Courteney Stuart',
		'Heavily armed US state police troopers leave Sandy Hook School in Newtown, Connecticut, December 14, 2012.',
		'Heavily armed police',
		'A Metro SWAT team drives through the Boston CBD after two explosive devices detonated at the finish line of the 117th Boston Marathon in Boston, Massachusetts, April 15, 2013.'
		]] //first is mil, second is cop
	var infoText= ''; //holds text from above to display when user guesses
	$('#ans').hide();
	$('#info').hide();
	$('#image').html('<img src="' + selectPic() + '.jpg"/>'); //adds image
	$('#police').click(function() { check('police');});
	$('#mil').click(function() {check('military');});
	$('#next').click(function() {
		//$('#image').hide();
		$('#info').hide();
		$('#image').html('<img src="' + selectPic() + '.jpg"/>'); //adds image
		//$('#image').slideDown();
		
	});

	function check(x) {
		if ($('#ans').html() === x) { 
			correct();
		} else {
			incorrect();
		}
	}

	function selectPic() {
		var choice = Math.floor(Math.random()*2); // choice of directory
		var pic = Math.floor(Math.random()*12);
		if (choice < 1) {
			$('#ans').html('military');
		} else {
			$('#ans').html('police');
		}
		infoText = arrayInfo[choice][pic];
		return choice + '/' + pic;
	}

	function correct() {
		$('#info').html('<strong>Correct!</strong> ' + infoText).show();
	}

	function incorrect() {
		$('#info').html('<strong>Incorrect!</strong> ' +infoText).show();
	}
		
		
});
