var name;
var distance;
var direction;

$(function() {
    $( "#accordion" ).accordion();
  });

$( document ).ready(function() {
	
	for (var i = 0; i < 48; i++)	{
		$("#location_list_GA-NC").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 49; i < shelters.length; i++)	{
		$("#location_list_TN").append("<option>" + shelters[i][0] + "</option>");
	}

});

$('#location_list_GA-NC').click(function() {

	name = $('#location_list_GA-NC').find('option:selected').text();

	console.log(name);

});

$('#location_list_TN').click(function() {

	name = $('#location_list_TN').find('option:selected').text();

	console.log(name);

});

	/*

	if ($('#location_list_mass').find('option:selected').text()) 	{
		name = $('#location_list_mass').find('option:selected').text();

	} 
	if ($('#location_list_conn').find('option:selected').text())	{
		name = $('#location_list_conn').find('option:selected').text();
	}

	console.log(name);

	*/


/*
$('#distance').click(function() {
	distance = $("#distance_field").val();
	console.log(distance);
});
*/

$("input:radio[name=direction]").click(function() {
    direction =  "" + $(this).val();
});

$('button').click(function()	{

	distance = parseFloat($("#distance_field").val());


	if (name == null || distance == null || direction == null)	{
		console.log("null!");
		$("#display_list").append("<p id='error'>Incomplete Information</p>");
		return;
	}
	
	var start_position;
	var end_position;
	var end_position_index;

	for (var i = 0; i < shelters.length; i++)	{
		if (name == shelters[i][0])	{
			start_position = shelters[i][1];
			break;
		}
	}

	console.log(start_position);

	if (direction == "north")	{

		end_position =	start_position + distance;

		console.log(end_position);
		console.log(start_position);
		console.log(distance);

		for (var i = 0; i < shelters.length; i++)	{
			if (shelters[i][1] > end_position)	{
				end_position = shelters[i][0];
				end_position_index = i;
				break;
			} 	
		}

		console.log(end_position_index);

		if (end_position_index == null || end_position_index == shelters.length - 1) {
			end_position_index = shelters.length -2;
		}

		if (end_position_index == 1 || end_position_index == 0) {
			end_position_index = 2;
		}

		console.log(end_position_index);

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

		for (var i = shelters.length - 1; i >= 0; i--)	{
			if (shelters[i][1] < end_position)	{
				end_position = shelters[i][0];
				end_position_index = i;
				break;
			} 	
		}

		console.log(end_position_index);

		if (end_position_index == null || 
			end_position_index == 0) {

			end_position_index = 1;
		}


		if (end_position_index == shelters.length - 1 || 
			end_position_index == shelters.length - 2) {

			end_position_index = shelters.length - 3;
		}

		console.log(end_position_index);

		$("#display_list").html("");

		for (var i = end_position_index + 2; i > end_position_index - 2; i--)	{
			$("#display_list").append('<p>');
			$("#display_list").append(shelters[i][0]);
			$("#display_list").append('</br>')
			$("#display_list").append(Math.round((start_position - shelters[i][1]) * 10) /10);
			$("#display_list").append('</p>');
		}

	}

	name = null;


});

var shelters	=	[];

shelters[0]		=	['Southern End of Appalachian Trial',	0.0];
shelters[1]		=	['Springer Mountian Shelter, GA',	0.2];
shelters[2]		=	['Stover Creek Shelter, GA',		2.8];
shelters[3]		=	['Hawk Mountian Shelter, GA',		8.1];
shelters[4]		=	['Gooch Mountian Shelter, GA',		15.8];
shelters[5]		=	['Woods Hole Shelter, GA',			28.1];
shelters[6]		=	['Blood Mountian Shelter, GA',		29.3];
shelters[7]		=	['Whitley Gap Shelter, GA',			38.4];
shelters[8]		=	['Low Gap Shelter, GA',				43.2];
shelters[9]		=	['Blue Mountian Shelter, GA',		50.5];
shelters[10]	=	['Tray Mountian Shelter, GA',		58.6];
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
shelters[41]	=	['Walnut Mountian Shelter, NC',		260.8];
shelters[42]	=	['Deer Park Mountian Shelter, NC',	270.7];
shelters[43]	=	['Spring Mountian Spring, NC',		284.9];
shelters[44]	=	['Little Laurel Shelter, NC',		293.5];
shelters[45]	=	['Jerry Cabin Shelter, NC',			300.3];
shelters[46]	=	['Flint Mountian Shelter, NC',		306.2];
shelters[47]	=	['Hogback Ridge	 Shelter, NC',		315.0];
shelters[48]	=	['Bald Mountian Shelter, NC',		325.1];
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
shelters[62]	=	['Iron Mountian Shelter, TN',		440.8];
shelters[63]	=	['Abingdon Gap Shelter, TN',		456.7];

/*
shelters[0]		=	['Connecticut-New York Line',		0.0];
shelters[1]		=	['Ten Mile River Shelter',			0.7];
shelters[2]		=	['Mt. Algo Shelter',				11.2];
shelters[3]		=	['Stewart Hollow Brook Shelter',	18.5];
shelters[4]		=	['Pine Swamp Brook Shelter',		28.5];
shelters[5]		=	['Limestone Spring Shelter',		40.8];
shelters[6] 	=	['Riga Shelter',					48.3];
shelters[7] 	=	['Brassie Brook Shelter',			49.5];
shelters[8] 	=	['The Hemlocks Shelter',			58.3];
shelters[9] 	=	['Glen Brook Shelter',				58.4];
shelters[10] 	=	['Tom Leonard Shelter',				72.7];
shelters[11]	=	['Mt. Wilcox South Shelter',		78.0];
shelters[12]	=	['Mt. Wilcox North Shelter',		79.8];
shelters[13]	=	['Upper Goose Pond Cabin',			93.8];
shelters[14]	=	['October Mountian Shelter',		102.6];
shelters[15]	=	['Kay Wood Shelter',				111.4];
shelters[16]	=	['Mark Noepel Shelter',				128.8];
shelters[17]	=	['Wilbur Clearing Shelter',			134.9];
shelters[18]	=	['Vermont-Massachusetts Line',		142.0];
*/
