var name;
var distance;
var direction;

$( document ).ready(function() {
	for (var i = 0; i < shelters.length; i++)	{
		$("#test").append("<option>" + shelters[i][0] + "</option");
	}
});

$('#location').click(function() {
	name = $('#location').find('option:selected').text();
});

$('#distance').click(function() {
	distance = parseInt($('#distance').find('option:selected').text());
});

$("input:radio[name=direction]").click(function() {
    direction =  "" + $(this).val();
});

$('button').click(function()	{

	if (name == null || distance == null || direction == null)	{
		console.log("null!");
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

	if (direction == "north")	{

		end_position =	start_position + distance;

		for (var i = 0; i < shelters.length; i++)	{
			if (shelters[i][1] > end_position)	{
				end_position = shelters[i][0];
				end_position_index = i;
				break;
			} 	
		}

		
		if (end_position_index == null || end_position_index == shelters.length - 1) {
			end_position_index = shelters.length -2;
		}

		if (end_position_index == 1 || end_position_index == 0) {
			end_position_index = 2;
		}

		for (var i = end_position_index - 2; i < end_position_index + 2; i++)	{
			$("#display").append('<p>');
			$("#display").append(shelters[i][0]);
			$("#display").append('&#09;');
			$("#display").append(Math.round((shelters[i][1] - start_position) * 10) /10);
			$("#display").append('</p>');
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

		for (var i = end_position_index + 2; i > end_position_index - 2; i--)	{
			$("#display").append('<p>');
			$("#display").append(shelters[i][0]);
			$("#display").append('&#09;');
			$("#display").append(Math.round((start_position - shelters[i][1]) * 10) /10);
			$("#display").append('</p>');
		}

	}


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

