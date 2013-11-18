var name;
var distance;
var direction;

$('#location').click(function() {

	name = $('#location').find('option:selected').text();

	console.log(name);
    
});

$('#distance').click(function() {

	distance = parseInt($('#distance').find('option:selected').text());

	console.log(distance);
});

$("input:radio[name=direction]").click(function() {
    direction =  "" + $(this).val();
    console.log(direction);
});

$('button').click(function()	{

	if(direction == "south") {
		var shelters_temp = shelters;
		shelters_reversed = shelters.reverse();
	}

	for (var i = 0; i < shelters_reversed.length; i++) {
		console.log(shelters_reversed[i]);
	}

	var start;

	for (var i = 0; i < shelters.length; i++)	{
		if (name == shelters[i][0])	{
			start = shelters[i][1];
			break;
		}
	}

	console.log("start milesage = " + start);

	var destenation;
	var total_distance =	start + distance;
	var destenation_index;

	for (var i = 0; i < shelters.length; i++)	{
		if (shelters[i][1] > total_distance)	{
			destenation = shelters[i][0];
			destenation_index = i;
			break;
		} 	
	}

	console.log(destenation_index);

	if (destenation_index == null || destenation_index == shelters.length - 1) {
		destenation_index = shelters.length -2;
	}

	if (destenation_index == 1 || destenation_index == 0) {
		destenation_index = 2;
	}

	console.log(destenation_index);

	for (var i = destenation_index - 2; i < destenation_index + 2; i++)	{
		$("#display").append('<p>');
		$("#display").append(shelters[i][0]);
		$("#display").append('&#09;');
		$("#display").append(Math.round((shelters[i][1] - start) * 10) /10);
		$("#display").append('</p>');
	}

/*
	shelters_reversed = shelters.reverse();

	for (var i = 0; i < shelters_reversed.length; i++)	{
		console.log(shelters_reversed[i][0]);
	}
*/

});

var shelters	=	[];

shelters[0]	=	['Ten Mile River Shelter',			0.7];
shelters[1]	=	['Mt. Algo Shelter',				11.2];
shelters[2]	=	['Stewart Hollow Brook Shelter',	18.5];
shelters[3]	=	['Pine Swamp Brook Shelter',		28.5];
shelters[4]	=	['Limestone Spring Shelter',		40.8];
shelters[5] =	['Riga Shelter',					48.3];
shelters[6] =	['Brassie Brook Shelter',			49.5];
shelters[7] =	['The Hemlocks Shelter',			58.3];
shelters[8] =	['Glen Brook Shelter',				58.4];