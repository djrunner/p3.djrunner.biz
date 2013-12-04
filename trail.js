/*
 * Daniel Breidenbach
 * CSCI-E 15 Fall 2013
 * Project 3, Java Script App.
 * JS file
 */

/*****Global variables*****/

var name = null;
var distance;
var direction;

/*****Jquery requred for accordian plug-in*****/

$(function() {
    $( "#accordion" ).accordion();
  });

/*
 * JQuery needed to take data from the shelters[] array
 * and put it into HTML as <option> tags.
 * This follows the DRY principle
 */

$( document ).ready(function() {
	
	for (var i = 0; i < 48; i++)	{
		$("#location_list_GA-NC").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 49; i < 80; i++)	{
		$("#location_list_TN-swVA").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 80; i < 129; i++)	{
		$("#location_list_cenoVA").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 129; i < 155; i++)	{
		$("#location_list_wVA-PA").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 155; i < 209; i++)	{
		$("#location_list_NJ-VT").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 209; i < shelters.length; i++)	{
		$("#location_list_NH-ME").append("<option>" + shelters[i][0] + "</option>");
	}

});

/*****JQuery code that instanciates a value to the name variable*****/

$('#location_list_GA-NC').click(function() {

	name = $('#location_list_GA-NC').find('option:selected').text();

});

$('#location_list_TN').click(function() {

	name = $('#location_list_TN-swVA').find('option:selected').text();

});


$('#location_list_TNcenoVA').click(function() {

	name = $('#location_list_cenoVA').find('option:selected').text();

});

$('#location_list_wVA-PA').click(function() {

	name = $('#location_list_wVA-PA').find('option:selected').text();

});

$('#location_list_NJ-VT').click(function() {

	name = $('#location_list_NJ-VT').find('option:selected').text();

});

$('#location_list_NH-ME').click(function() {

	name = $('#location_list_NH-ME').find('option:selected').text();

});

/*****JQuery code that instanciates a value to the direction variable*****/

$("input:radio[name=direction]").click(function() {
    direction =  "" + $(this).val();
});

/*
 * This is the main function of the App.
 * This button takes the stored value of "name", "direction" and "distance"
 * and determines four shelters around the desiered goal.
 */

$('button').click(function()	{

	/*****First, the distance entered by the user is grabbed and parsed as a Float*****/

	distance = parseFloat($("#distance_field").val());

	/*****If any of the three global variables are null, an error message is shown*****/


	if ( isNaN (distance) || name == 'null' || direction == undefined)	{
		$("#display_list").html("");
		$("#display_list").append("<p id='error'>Incomplete Information</p>");
		return;
	}

	/*
	 * Three local variables,
	 * start_position and end_position are the absolute values of the milage
	 * of a particular shelter from the southern end of the trail.
	 * end_position_index is the index of the array at the desired destenation shelter.
	 */
	
	var start_position;
	var end_position;
	var end_position_index;

	/*
	 * A for loop to determine the absolute milage of the selected starting location
	 * For example, Woods Hole Shelter has an absolute milage of 28.1, because it's
	 * 28.1 miles from the southern end of the trail (i.e. the begining of the array)
	 */

	for (var i = 0; i < shelters.length; i++)	{
		if (name == shelters[i][0])	{
			start_position = shelters[i][1];
			break;
		}
	}

	/*
	 * If the direction selected is north, the array will be traversed in ascending order,
	 * if the direction selected is south, the array will be traversed in descending order.
	 */

	if (direction == "north")	{

		/*
		 * the end_position will be the absolute milage of starting shelter selected
		 * by the user and the distance entered by the user.
		 */

		end_position =	start_position + distance;

		/*
		 * this for loop goes through the array in ascending order (i.e. north through
		 * the appalachian trail) until a shelter is found whose absolute milage is greater
		 * than the end_position. when this shelter is found we break out of the for loop, saving 
		 * the shelter and the index of the shelter in the array.
		 */

		for (var i = 0; i < shelters.length; i++)	{
			if (shelters[i][1] > end_position)	{
				end_position = shelters[i][0];
				end_position_index = i;
				break;
			} 	
		}

		/* The following code is to take care of special cases. Either the end_postion is
		 * at the very end or very begining of the array. If this is the case, the end_position_index
		 * is moved up or back.
		 * This is because four total shelters will displayed on the page, two before the desired distance
		 * and two after the desired distance from the starting shelter.
		 */

		if (end_position_index == null || end_position_index == shelters.length - 1) {
			end_position_index = shelters.length -2;
		}

		if (end_position_index == 1 || end_position_index == 0) {
			end_position_index = 2;
		}

		/* This last set of code takes the data for the four shelters to be displayed to the user and 
		 * displays them on the page. 
		 * Again, it will display two shelters located before the desired distance from the starting shelter,
		 * and two sheleters located after the desired distance from the starting shelter.
		 * This will be done with Jquery appending <p> tags to the #display_list .option_box.
		 */

		$("#display_list").html("");

		for (var i = end_position_index - 2; i < end_position_index + 2; i++)	{
			$("#display_list").append('<p>');
			$("#display_list").append(shelters[i][0]);
			$("#display_list").append('</br>')
			$("#display_list").append(Math.round((shelters[i][1] - start_position) * 10) /10);
			$("#display_list").append(" Miles");
			$("#display_list").append('</p>');
		}
	}

	else {  // direction == south

		end_position =	start_position - distance;

		/***** Similar to the code for "north", except the array is travsered through in reverse order*****/

		for (var i = shelters.length - 1; i >= 0; i--)	{
			if (shelters[i][1] < end_position)	{
				end_position = shelters[i][0];
				end_position_index = i;
				break;
			} 	
		}

		if (end_position_index == null || 
			end_position_index == 0) {

			end_position_index = 1;
		}

		if (end_position_index == shelters.length - 1 || 
			end_position_index == shelters.length - 2) {

			end_position_index = shelters.length - 3;
		}

		$("#display_list").html("");

		for (var i = end_position_index + 2; i > end_position_index - 2; i--)	{
			$("#display_list").append('<p>');
			$("#display_list").append(shelters[i][0]);
			$("#display_list").append('</br>')
			$("#display_list").append(Math.round((start_position - shelters[i][1]) * 10) /10);
			$("#display_list").append(" Miles");
			$("#display_list").append('</p>');
		}

	}


});

/*
 * The array list of shelters.
 * This data was taken from "Appalachian Trial Data Book 2012",
 * published by the Appalachian Trail Conservancy
 */


var shelters	=	[];

shelters[0]		=	['Southern End of Appalachian Trial',	0.0];
shelters[1]		=	['Springer Mountian Shelter, GA',	0.2];
shelters[2]		=	['Stover Creek Shelter, GA',		2.8];
shelters[3]		=	['Hawk Mountain Shelter, GA',		8.1];
shelters[4]		=	['Gooch Mountain Shelter, GA',		15.8];
shelters[5]		=	['Woods Hole Shelter, GA',			28.1];
shelters[6]		=	['Blood Mountain Shelter, GA',		29.3];
shelters[7]		=	['Whitley Gap Shelter, GA',			38.4];
shelters[8]		=	['Low Gap Shelter, GA',				43.2];
shelters[9]		=	['Blue Mountain Shelter, GA',		50.5];
shelters[10]	=	['Tray Mountain Shelter, GA',		58.6];
shelters[11]	=	['Deep Gap Shelter, GA',			66.0];
shelters[12]	=	['Plumorchard Gap Shelter, GA',		74.1];

shelters[13]	=	['Muskrat Creek Shelter, NC',		81.4];
shelters[14]	=	['Standing Indian Shelter, NC',		86.3];
shelters[15]	=	['Carter Gap Shelter, NC',			93.9];
shelters[16]	=	['Big Spring Shelter, NC',			100.7];
shelters[17]	=	['Long Branch Shelter, NC',			102.5];
shelters[18]	=	['Rock Gap Shelter, NC',			106.0];
shelters[19]	=	['Siler Bald Shelter, NC',			114.0];
shelters[20]	=	['Wayah Shelter, NC',				120.8];
shelters[21]	=	['Cold Spring Shelter, NC',			125.6];
shelters[22]	=	['Wesser Bald Shelter, NC',			131.4];
shelters[23]	=	['A. Rufus Morgan Shelter, NC',		136.3];
shelters[24]	=	['Sassafras Gap Shelter, NC',		144.0];
shelters[25]	=	['Brown Fork Gap Shelter, NC',		153.1];
shelters[26]	=	['Cable Gap Shelter, NC',			159.2];
shelters[27]	=	['Fontana Gap Shelter, NC',			165.8];
shelters[28]	=	['Mollies Ridge Shelter, NC',		176.8];
shelters[29]	=	['Russel Field Shelter, NC',		179.6];
shelters[30]	=	['Derrick Knob Shelter, NC',		188.8];
shelters[31]	=	['Silers Bald Shelter, NC',			194.3];
shelters[32]	=	['Double Spring Gap Shelter, NC',	206.0];
shelters[33]	=	['Mt. Collins Shelter, NC',			202.3];
shelters[34]	=	['Ice Water Spring Shelter, NC',	209.8];
shelters[35]	=	['Pecks Corner Shelter, NC',		217.2];
shelters[36]	=	['Tri-Corner Knob Shelter, NC',		222.4];
shelters[37]	=	['Cosby Knob Shelter, NC',			230.1];
shelters[38]	=	['Davenport Gap Shelter, NC',		238.1];
shelters[39]	=	['Groundhog Creek Shelter, NC',		247.7];
shelters[40]	=	['Roaring Fork Shelter, NC',		255.9];
shelters[41]	=	['Walnut Mountain Shelter, NC',		260.8];
shelters[42]	=	['Deer Park Mountain Shelter, NC',	270.7];
shelters[43]	=	['Spring Mountain Spring, NC',		284.9];
shelters[44]	=	['Little Laurel Shelter, NC',		293.5];
shelters[45]	=	['Jerry Cabin Shelter, NC',			300.3];
shelters[46]	=	['Flint Mountain Shelter, NC',		306.2];
shelters[47]	=	['Hogback Ridge	 Shelter, NC',		315.0];
shelters[48]	=	['Bald Mountain Shelter, NC',		325.1];
shelters[49]	=	['No Buisness Knob Shelter, NC',	335.7];

shelters[50]	=	['Curley Maple Gap Shelter, TN',	346.2];
shelters[51]	=	['Cherry Gap Shelter, TN',			359.0];
shelters[52]	=	['Clyde Smith Shelter, TN',			368.2];
shelters[53]	=	['Roan High Knob Shelter, TN',		375.4];
shelters[54]	=	['Stan Murray Shelter, TN',			380.8];
shelters[55]	=	['Overmountian Shelter, TN',		382.7];
shelters[56]	=	['Apple House Shelter, TN',			391.4];
shelters[57]	=	['Mountianier Shelter, TN',			400.7];
shelters[58]	=	['Moreland Gap Shelter, TN',		410.3];
shelters[59]	=	['Laurel Fork Shelter, TN',			418.2];
shelters[60]	=	['Watauga Lake Shelter, TN',		426.8];
shelters[61]	=	['Vandeventer Shelter, TN',			434.0];
shelters[62]	=	['Iron Mountain Shelter, TN',		440.8];
shelters[63]	=	['Abingdon Gap Shelter, TN',		456.7];

shelters[64]	=	['Saunders Shelter, VA',			476.3];
shelters[65]	=	['Lost Mountain Shelter, VA',		482.7];
shelters[66]	=	['Thomas Knob Shelter, VA',			494.9];	
shelters[67]	=	['Wise Shelter, VA'	,				500.0];
shelters[68]	=	['Old Orchard Shelter, VA',			505.9];
shelters[69]	=	['Hurricane Mountain Shelter, VA',	510.9];
shelters[70]	=	['Trimpi Shelter, VA',				520.0];
shelters[71]	=	['Partnership Shelter, VA',			530.6];
shelters[72]	=	['Chatfield Shelter, VA',			537.7];
shelters[73]	=	['Knot Maul Branch Shelter, VA',	556.1];
shelters[74]	=	['Chestnut Knob Shelter, VA',		565.2];
shelters[75]	=	['Jenkins Shelter, VA',				575.2];
shelters[76]	=	['Helveys Mill Shelter, VA',		589.2];
shelters[77]	=	['Jenny Knob Shelter, VA',			599.0];
shelters[78]	=	['Wapiti Shelter, VA',				613.2];
shelters[79]	=	["Doc's Knob Shelter, VA",			621.6];	

shelters[80]	=	['Rice Field Shelter, VA',			636.6];
shelters[81]	=	['Pine Swamp Branch Shelter, VA',	649.1];
shelters[82]	=	['Bailey Gap Shelter, VA',			653.0];
shelters[83]	=	['War Spur Shelter, VA',			661.8];
shelters[84]	=	['Laurel Creek Shelter, VA',		667.6];
shelters[85]	=	['Sarver Hollow Shelter, VA',		674.0];
shelters[86]	=	['Niday Shelter, VA',				680.0];
shelters[87]	=	['Pickle Branch Shelter, VA',		690.1];
shelters[88]	=	['Catawba Mountain Shelter, VA',	704.7];
shelters[89]	=	['Campbell Shelter, VA',			708.1];
shelters[90]	=	['Lamberts Meadow Shelter, VA',		713.1];
shelters[91]	=	['Fullhardt Knob Shelter, VA',		727.5];
shelters[92]	=	['Wilson Creek Shelter, VA',		733.7];
shelters[93]	=	['Bobblets Gap Shelter, VA',		741.0];
shelters[94]	=	['Cove Mountain Shelter, VA',		747.5];
shelters[95]	=	['Bryant Ridge Shelter, VA',		754.5];
shelters[96]	=	['Cornelius Creek Shelter, VA',		759.4];
shelters[97]	=	['Thunder Hill Shelter, VA',		764.7];
shelters[98]	=	['Matts Creek Shelter, VA',			777.1];
shelters[99]	=	['Johns Hollow Shelter, VA',		781.0];
shelters[100]	=	['Punchbowl Shelter, VA',			789.8];
shelters[101]	=	['Brown Mountain Creek Shelter, VA',799.3];
shelters[101]	=	['Cow Camp Gap Shelter, VA',		804.9];
shelters[102]	=	['Seeley-Woodworth Shelter, VA',	815.1];
shelters[103]	=	['The Priest Shelter, VA',			822.2];
shelters[104]	=	['Harpers Creek Shelter, VA',		829.8];
shelters[105]	=	['Maupin Field Shelter, VA',		836.0];
shelters[106]	=	['Paul C. Wolfe Shelter, VA',		851.8];

shelters[107]	=	['Calf Mountian Shelter, VA',		863.8];
shelters[108]	=	['Blackrock Hut, VA',				876.8];
shelters[109]	=	['Pinefield Hut, VA',				890.0];
shelters[110]	=	['Hightop Hut, VA',					898.4];
shelters[111]	=	['Bearfence Mountian Hut, VA',		910.8];
shelters[112]	=	['Rock Spring Cabin & Hut, VA',		922.3];
shelters[113]	=	['Byrds Next #3 Shelter, VA',		933.2];
shelters[114]	=	['Pass Mountian Hut, VA',			937.6];
shelters[115]	=	['Gravel Springs Hut, VA',			950.7];
shelters[116]	=	['Tom Floyd Wayside, VA',			961.2];
shelters[117]	=	['Jim and Molly Denton Shelter, VA',969.3];
shelters[118]	=	['Manassas Gap Shelter, VA',		974.8];
shelters[119]	=	["Dick's Dome Shelter, VA",			979.3];
shelters[120]	=	['Rod Hollow Shelter, VA',			987.7];
shelters[121]	=	['Sam Moore Shelter, VA',			994.6];

shelters[122]	=	['Blackburn Trial Center, W.VA',	1005.5];
shelters[123]	=	['David Leser Memorial Shelter, W.VA',	1008.7];
shelters[124]	=	['Harpers Ferry, W.VA',				1017.3];

shelters[125]	=	['Ed Garvey Shelter, MD',			1024.3];
shelters[126]	=	['Crampton Garvey Shelter, MD',		1028.4];
shelters[127]	=	['Rocky Run Shelter, MD',			1033.4];
shelters[128]	=	['Pine Knob Shelter, MD',			1041.9];
shelters[129]	=	['Ensign Cowall Shelter, MD',		1050.1];
shelters[130]	=	['Raven Rock Shelter, MD',			1050.0];

shelters[131]	=	['Deer Lick Shelter, PA',			1059.6];
shelters[132]	=	['Antietam Shelter, PA',			1062.0];
shelters[133]	=	['Hermitage Cabin (Locked), PA',	1063.2];
shelters[134]	=	['Rocky Mountian Shelter, PA',		1069.8];
shelters[135]	=	['Quarry Gap Shelter, PA',			1075.4];
shelters[136]	=	['Birch Run Shelter, PA',			1082.8];
shelters[137]	=	['Toms Run Shelter, PA',			1087.0];
shelters[138]	=	['James Fray Shelter, PA',			1097.9];
shelters[139]	=	['Alec Kennedy Shelter, PA',		1106.0];
shelters[140]	=	['Darlington Shelter, PA',			1124.2];
shelters[141]	=	['Cove Mountian Shelter, AP',		1131.5];
shelters[142]	=	['Clarks Ferry Shelter, PA',		1140.1];
shelters[143]	=	['Peters Mountian Shelter, PA',		1146.5];
shelters[144]	=	['Rausch Gap Shelter, PA',			1164.5];
shelters[145]	=	['William Penn Shelter, PA',		1177.9];
shelters[146]	=	['501 Shelter, PA',					1182.0];
shelters[147]	=	["Eagle's Nest Shelter, PA",		1197.1];
shelters[148]	=	['Windsor Furnace Shelter, PA',		1211.8];
shelters[149]	=	['Eckville Shelter, PA',			1220.9];
shelters[150]	=	['Allentown Hiking Club Shelter, PA',	1228.3];
shelters[151]	=	['Bake Oven Knob Shelter, PA',		1238.3];
shelters[152]	=	['George W. Outerbridge Shelter, PA',	1245.1];
shelters[153]	=	['Leroy A. Smith Shelter, PA',		1261.8];
shelters[154]	=	['Kirkridge Shelter, PA',			1275.6];

shelters[155]	=	['Brink Road Shelter, NJ',			1306.8];
shelters[154]	=	['Anderson Shelter, NJ',			1313.4];
shelters[155]	=	['Mashipacong Shelter, NJ',			1320.2];
shelters[156]	=	['High Point Shelter, NJ',			1327.2];
shelters[157]	=	['Pochunch Mountian Shelter, NJ',	1239.6];
shelters[158]	=	['Wawayanda Shelter, NJ',			1351.1];

shelters[159]	=	['Wildcat Shelter, NY',				1363.2];
shelters[160]	=	['Fingerboard Shelter, NY',			1376.5];
shelters[161]	=	['William Brien Shelter, NY',		1381.8];
shelters[162]	=	['West Mountian Shelter, NY',		1384.9];
shelters[163]	=	['RPH Shelter, NY',					1417.1];
shelters[164]	=	['Morgan Stewart Shelter, NY',		1426.1];
shelters[165]	=	['Telephone Pioneers Shelter, NY',	1433.9];
shelters[166]	=	['Wiley Shelter, NY',				1442.7];

shelters[167]	=	['Ten Mile River Shelter, CT',		1446.7];
shelters[168]	=	['Mt. Algo Shelter, CT',			1455.1];
shelters[169]	=	['Stewart Hollow Brook Shelter, CT',1462.4];
shelters[170]	=	['Pine Swamp Brook Shelter, CT',	1472.4];
shelters[171]	=	['Limestone Spring Shelter, CT',	1484.7];
shelters[172] 	=	['Riga Shelter, CT',				1492.2];
shelters[173] 	=	['Brassie Brook Shelter, CT',		1493.4];

shelters[174] 	=	['The Hemlocks Shelter, MA',		1502.2];
shelters[175] 	=	['Glen Brook Shelter, MA',			1502.3];
shelters[176] 	=	['Tom Leonard Shelter, MA',			1516.6];
shelters[177]	=	['Mt. Wilcox South Shelter, MA',	1521.9];
shelters[178]	=	['Mt. Wilcox North Shelter, MA',	1523.7];
shelters[179]	=	['Upper Goose Pond Cabin, MA',		1537.7];
shelters[180]	=	['October Mountian Shelter, MA',	1546.5];
shelters[181]	=	['Kay Wood Shelter, MA',			1555.3];
shelters[182]	=	['Mark Noepel Shelter, MA',			1572.2];
shelters[183]	=	['Wilbur Clearing Shelter, MA',		1578.8];

shelters[184]	=	['Seth Warner Shelter, VT',			1588.7];
shelters[185]	=	['Congdon Shelter, VT',				1595.9];
shelters[186]	=	['Melville Nauheim Shelter, VT',	1600.8];
shelters[187]	=	['Goddard Shelter, VT',				1609.3];
shelters[188]	=	['Kid Gore Shelter, VT',			1613.6];
shelters[189]	=	['Story Spring Shelter, VT',		1618.2];
shelters[190]	=	['Stratton Pond Shelter, VT',		1628.6];
shelters[191]	=	['William B. Douglas Shelter, VT',	1629.1];
shelters[192]	=	['Spruce Peak Shelter, VT',			1632.1];
shelters[193]	=	['Bromley Shelter, VT',				1636.9];
shelters[194]	=	['Peru Peak Shelter, VT',			1645.0];
shelters[195]	=	['Lost Pond Shelter, VT',			1653.7];
shelters[196]	=	['Old Job Shelter, VT',				1655.2];
shelters[197]	=	['Big Branch Shelter, VT',			1655.4];
shelters[198]	=	['Little Rock Pond Shelter, VT',	1658.7];
shelters[199]	=	['Greenwall Shelter, VT',			1663.5];
shelters[200]	=	['Minerva Hinchey Shelter, VT',		1668.6];
shelters[201]	=	['Clarendon Shelter, VT',			1672.3];
shelters[202]	=	['Governor Clement Shelter, VT',	1681.1];
shelters[203]	=	['Cooper Lodge, VT',				1685.4];
shelters[204]	=	['Churchill Scott Shelter, VT',		1689.8];
shelters[205]	=	['Stony Brook Shelter, VT',			1701.7];
shelters[206]	=	['Wintturi Shelter, VT',			1711.6];
shelters[207]	=	['Thistle Hill Shelter, VT',		1723.2];
shelters[208]	=	['Happy Hill Shelter, VT',			1732.0];

shelters[209]	=	['Velvet Rocks Shelter, NH',		1739.3];
shelters[210]	=	['Moose Mountian Shelter, NH',		1748.8];
shelters[211]	=	['Trapper John Shelter, NH',		1755.5];
shelters[212]	=	["Firewarden's Cabin, NH",			1762.2];
shelters[213]	=	['Hexacuba Shelter, NH',			1767.5];
shelters[214]	=	['Ore Hill Shelter, NH',			1784.6];
shelters[215]	=	['Jeffers Brook Shelter, NH',		1793.2];
shelters[216]	=	['Beaver Brook Shelter, NH',		1800.1];
shelters[217]	=	['Eliza Brook Shelter, NH',			1809.1];
shelters[218]	=	['Kinsman Pond Shelter, NH',		1813.1];
shelters[219]	=	['Garfield Ridge Shelter, NH',		1828.2];
shelters[220]	=	['Guyut Shelter, NH',				1834.0];
shelters[221]	=	['Ethan Pond Shelter, NH',			1843.0];
shelters[222]	=	['The Pearch Shelter, NH',			1862.6];
shelters[223]	=	['Gray Knob Cabin, NH',				1863.2];
shelters[224]	=	['Imp Shelter, NH',					1885.0];
shelters[225]	=	['Rattle River Shelter, NH',		1891.1];
shelters[226]	=	['Gentian Pond Shelter, NH',		1904.8];

shelters[227]	=	['Carlo Cal Shelter, ME',			1910.0];
shelters[228]	=	['Full Goose Shelter, ME',			1914.4];
shelters[229]	=	['Baldpate Lean-to, ME',			1926.4];
shelters[230]	=	['Frye Notch Lean-to, ME',			1929.9];
shelters[231]	=	['Hall Mountian Lean-to, ME',		1940.4];
shelters[232]	=	['Bemis Mountian Lean-to, ME',		1953.2];
shelters[233]	=	['Sabbath Day Pond Lean-to, ME',	1961.5];
shelters[234]	=	['Pizza Rock Lean-to, ME',			1972.7];
shelters[235]	=	['Poplar Ridge Lean-to, ME',		1981.6];
shelters[236]	=	['Spaulding Mountian Lean-to, ME',	1989.6];
shelters[237]	=	['Horns Pond Lean-tos, ME',			2008.2];
shelters[238]	=	['Little Bigelow Lean-to, ME',		2018.4];
shelters[239]	=	['West Carry Pond Lean-to, ME',		2026.1];
shelters[240]	=	['Pierce Pond Lean-to, ME',			2036.1];
shelters[241]	=	['Pleasant Pond Lean-to, ME',		2045.8];
shelters[242]	=	['Bald Mountian Brook Lean-to, ME',	2054.8];
shelters[243]	=	['Moxie Bald Lean-to, ME',			2058.9];
shelters[244]	=	['Horseshoe Canyon Lean-to, ME',	2067.8];
shelters[245]	=	['Leeman Brook Lean-to, ME',		2079.8];
shelters[246]	=	['Wilson Valley Lean-to, ME',		2088.2];
shelters[247]	=	['Long Pond Stream Lean-to, ME',	2092.9];
shelters[248]	=	['Cloud Pond Lean-to, ME',			2096.2];
shelters[249]	=	['Chairback Gap Lean-to, ME',		2103.1];
shelters[250]	=	['Carl A. Newhall Lean-to, ME',		2113.0];
shelters[251]	=	['Logan Brook Lean-to, ME',			2119.2];
shelters[252]	=	['East Branch Lean-to, ME',			2122.8];
shelters[253]	=	['Cooper Brook Falls Lean-to, ME',	2130.9];
shelters[254]	=	['Potaywadjo Spring Lean-to, ME',	2142.3];
shelters[255]	=	['Wadleigh Stream Lean-to, ME',		2153.4];
shelters[256]	=	['Rainbow Stream Lean-to, ME',		2161.5];
shelters[257]	=	['Hurd Brook Shelter, ME',			2169.0];
shelters[258]	=	['Birches Campsite, ME'	,			2182.4];
shelters[259]	=	['Northern End of Appalachian Trial',	2187.6];