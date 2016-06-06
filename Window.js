function closeButton()
{
	this.background = "linear-gradient(#B8D0E9, #99B4D1)";
	this.overBackground = "linear-gradient(#E8A699, #B8432C)";
	this.border = "1px solid gray";
	this.color;
	
	this.destroy;
	
	this.mouseOverListener;
	this.mouseOutListener;
	this.mouseClickListener;
	
	this.id;
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		this.id = this.id + "_" + id;
		con.style.background = this.background;
		con.style.border = this.border;
		con.style.boxShadow = "inset 0px 0px 0px 1px #D9E7F4";
		con.style.display = "inline-block";
		con.style.float = "right";
		con.style.padding = "5px";
		con.innerHTML = "X";
		con.id = this.id;
		
		if(document.getElementById(parent) != null)
			document.getElementById(parent).appendChild(con);
		
		if(this.mouseClickListener != null)
				con.addEventListener('click', this.mouseClickListener, false);
		else
		{
			con.addEventListener('click', 
			function() 
			{ 
				this.destroy = true;
				if(document.getElementById(this.id) != null)
				{
					var ancestor = document.getElementById(this.id).parentNode.parentNode;
					ancestor.style.display = "none"; 
				}
			}, false);
		}
		if(this.mouseoverListener != null)
				con.addEventListener('mouseover', this.mouseoverListener, false);
		else
		{
			var overColor = this.overBackground;
			con.addEventListener('mouseover', 
			function() 
			{ 
				if(document.getElementById(this.id) != null)
				{
					document.getElementById(this.id).style.background = overColor;
					document.getElementById(this.id).style.boxShadow = "inset 0px 0px 0px 1px #F0CBC4";
				}
			}, false);
		}
		if(this.mouseoutListener != null)
				con.addEventListener('mouseout', this.mouseoutListener, false);
		else
		{
			var color = this.background;
			con.addEventListener('mouseout', 
			function() 
			{ 
				if(document.getElementById(this.id) != null)
				{
					document.getElementById(this.id).style.background = color;
					document.getElementById(this.id).style.boxShadow = "inset 0px 0px 0px 1px #D9E7F4";
				}
			}, false);
		}
	}
}

function TitleBar(label)
{
	this.background = "linear-gradient(#99B4D1, #B8D0E9)";
	this.textColor = "black";
	this.label = label;
	this.id = "title";
	this.dragFlag = false;
	this.mouseUpListener;
	this.mouseDownListener;
	this.mouseMoveListener;
	this.mouseOutListener
	this.offsetX = 0;
	this.offsetY = 0;
	
	this.closeButton = new closeButton();

	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		var text = document.createElement('div');
		
		this.id = this.id + "_" + id;
		con.style.background = this.background;
		con.style.overflow = "hidden";
		con.style.padding = "5px";
		con.innerHTML = label;
		con.id = this.id;
		
		if(document.getElementById(parent) != null)
		{
			var parentNode = document.getElementById(parent);
			con.style.borderTopLeftRadius = parentNode.style.borderTopLeftRadius;
			con.style.borderTopRightRadius = parentNode.style.borderTopRightRadius;
			document.getElementById(parent).appendChild(con);
		}
		
		if(document.getElementById(this.id) != null)
		{
			this.closeButton.addSelfTo(this.id);
		}
		//////////////// Mouse Listeners ////////////////////////////////////////
		if(this.mouseDownListener != null)
				con.addEventListener('mousedown', this.mouseDownListener, false);
		else
		{
			con.addEventListener('mousedown', 
			function(e) 
			{ 
				if(document.getElementById(this.id) != null)
				{
					this.dragFlag = true;
					var rect = document.getElementById(this.id).getBoundingClientRect();
					this.offsetX = e.clientX - rect.left;
					this.offsetY = e.clientY - rect.top;
				}
			}, false);
		}
		if(this.mouseUpListener != null)
				con.addEventListener('mouseup', this.mouseUpListener, false);
		else
		{
			con.addEventListener('mouseup', 
			function() 
			{ 
				if(document.getElementById(this.id) != null)
				{
					this.dragFlag = false;
				}
			}, false);
		}
		if(this.mouseOutListener != null)
				con.addEventListener('mouseout', this.mouseOutListener, false);
		else
		{
			con.addEventListener('mouseout', 
			function() 
			{ 
				if(document.getElementById(this.id) != null)
				{
					this.dragFlag = false;
				}
			}, false);
		}
		if(this.mouseMoveListener != null)
				con.addEventListener('mousemove', this.mouseMoveListener, false);
		else
		{
			con.addEventListener('mousemove', 
			function(e) 
			{ 
				if(document.getElementById(this.id) != null)
				{ 
					if(this.dragFlag)
					{
						var ancestor = document.getElementById(this.id).parentNode;
						ancestor.style.position = "absolute"; 
						var newX = e.clientX - this.offsetX;
						var newY = e.clientY - this.offsetY;
						ancestor.style.left = newX + "px"; 
						ancestor.style.top = newY + "px";
					}
				}
			}, false);
		}
	}
}

function Window(label)
{
	this.titleBar = new TitleBar(label);
	this.border = "1px solid black";
	this.width;
	this.height;
	
	this.id;
	this.containerId;
	this.children = [];
	
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		this.id = this.id + "_" + id;
		con.style.border = this.border;
		con.style.boxShadow = "outset 0px 0px 0px 10px #D9E7F4";
		con.style.borderTopLeftRadius = "10px 10px";
		con.style.borderTopRightRadius = "10px 10px";
		con.style.display = "inline-block";
		
		con.id = this.id;
		
		document.getElementById(parent).appendChild(con);
		this.titleBar.addSelfTo(this.id, this.children.length - 1);

		var container = document.createElement('div');
		this.containerId = this.id + "_" + "container";
		container.id = this.containerId;
		document.getElementById(con.id).appendChild(container);
		
		if(container != null)
		{
			for(var i = 0; i!= this.children.length; i++)
				this.children[i].addSelfTo(container.id, i);
		}
	}
	
	this.add = function(object)
	{
		this.children.push(object);
		object.addSelfTo(this.id, this.children.length - 1);
	}
}