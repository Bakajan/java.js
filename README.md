# java.js
An object oriented JavaScript Framework that is similar to Java.

The objective is to create a framework that eases the transition of a Java programmer (or other programmer) into web design by familiar association. Also, the goal is to create a framework that makes web application design easier and more standardized like swing does for Java.

example of usage

<script src="java.js/Frame.js"></script>
<script src="java.js/MenuBar.js"></script>
<script src="java.js/MenuItem.js"></script>
<script src="java.js/Menu.js"></script>
<body>
<div id="content"></div>
</body>
<script>
var con = new Frame('content');
	var menu = new MenuBar();

	var home = new MenuItem("Sites");
	var item = new Menu("Commodore");
	var esohp = new Menu("EShop");
	home.add(item);
	home.add(esohp);
	menu.add(home);
	con.add(menu);
</script>

Would add a menu bar at the top of the page.
