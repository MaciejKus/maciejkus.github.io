var nextAssetNum = 6, //next number for asset row. 5 already there.
   table = $('#restable');

$('#add').click(function() {
	$('#leftassets').append("<div class='row'>\
        <div class='col-xs-4'>\
         <div class='input-group'>\
          <input type='text' id='asset" + nextAssetNum + "' class='form-control'>\
         </div>\
        </div>\
        <div class='col-xs-3'>\
         <div class='input-group'>\
          <input type='text' id='per"+ nextAssetNum +"' class='form-control'>\
          <div class='input-group-addon hidden-xs'>%</div>\
         </div>\
        </div>\
        <div class='col-xs-5'>\
         <div class='input-group'>\
          <div class='input-group-addon hidden-xs'>$</div>\
          <input type='text' id='cash" +nextAssetNum + "' class='form-control'>\
         </div>\
       </div> \
     </div> <!--end row-->\
	"); //end of append
	nextAssetNum++;
});

$('#calculate').click(function() {
	var tableAppend = '',
	  total = parseInt($('#Total').val()),
	  error = $('#error');
	error.html('').hide();

	resetTable();

	if (!total) {
		$('#error').html('Please enter numeric  Cash to Invest amount').show();
		return;
	}
	for (var i =0; i < nextAssetNum; i++) {
		var ass = $('#asset' + i).val(), 
  		  per = parseInt($('#per' +i).val()),
		  cash = parseInt($('#cash' + i).val()),
		  perdiff = (Math.round(per - 100 * cash/total) || 'NA');
 		if (ass && per) {
                	tableAppend += "<tr>\
			<td>" + ass + "</td>\
			<td>" + Math.round(total*per/100) + "</td>\
			<td>" + (Math.round(100 * cash/total) || 'NA') + "</td>";
			//highlight if more than 5 percent difference:
			if(Math.abs(perdiff) >= 5) {
				tableAppend += "<td class='danger'>" + perdiff + "</td>";
			} else {
				tableAppend += "<td>" + perdiff + "</td>";
			}
			tableAppend += "<td>" + (Math.round(total*per/100 - cash) || 'NA') + "</td>\
			</tr>";
                } //end if
	} //end for
	if (!tableAppend) {
		$('#error').html('Please enter at least one full row of valid values').show();
		return;
	}
		

	table.append(tableAppend);
});

$('#reset').click( function() {
	resetTable();
	$('.form-control').val(''); //reset all input fields
});

function resetTable() {
	table.html("<tr class='lead'>\
      <th>Asset</th>\
      <th>Correct Amount</th>\
      <th>Current Percent</th>\
      <th>Percent Difference</th>\
      <th>Dollar Difference</th>\
     </tr>");
}
