// Call the dataTables jQuery plugin
$(document).ready(function() {
	var i=1;
	setInterval(function(){
		if($('#dataTable').length && i==1)
		{
			i = 0;
  			$('#dataTable').DataTable();
		}
		else
		{
			i = 1;
		}
	},800);
});
