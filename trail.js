var name;
var distance;
var direction;

$(function() {
    $( "#accordion" ).accordion();
  });

$( document ).ready(function() {
	
	for (var i = 0; i < 8; i++)	{
		$("#location_list_mass").append("<option>" + shelters[i][0] + "</option>");
	}

	for (var i = 8; i < shelters.length; i++)	{
		$("#location_list_conn").append("<option>" + shelters[i][0] + "</option>");
	}

});

$('#location_list_mass').click(function() {

	name = $('#location_list_mass').find('option:selected').text();

	console.log(name);

});

$('#location_list_conn').click(function() {

	name = $('#location_list_conn').find('option:selected').text();

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
		$("#display_list").append("<p>Incomplete Information</p>");
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
	distance = null;
	direction = null;


});

var shelters	=	[];

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

