/*Plane.js by Lincoln Green(http://www.binkworks.com/)*/

/*SETUP INSTRUCTIONS FOR SCRIPT:
	There are some oddities with the default rotation of some of the objects in the protopack, one of these being that the plane's nose points backward along the Z-axis. To circumvent this, I have placed the plane model from the protopack into an empty gameobject and then flipped the plane's z-object. This empty gameobject is the object that contains this script. This allows us to use transform.Translate(0, 0, 1) to move forward, rather than backward. 
	To get the propeller of the plane to spin, you need to drag the propeller object into the 'propeller' slot of this script.*/

/*ABOUT
	The first thing that is done in the Update() function is rotating the propeller. This is for display only - you can remove it without killing your plane.

The next thing we do is define a defaultTilt Quaternion. Basically what this vector does is take the rotation of the plane and sets the x and z values to 0 so the plane is not nosing up or down and is not turning. Note that this does not affect the plane itself in any way - it is just an unused Quaternion(until later).

The next thing we do is read input and modify the eulerAngles of the transform based on input. Left/Right arrows turn the airplane, so we rotate along the y-axis. Up/Down arrows nose the plane up and down, so we rotate along the x axis. Note that there is some funky business going on with the up arrow - it is commented below.

If none of the arrows keys are pressed, then we smoothly rotate the plane back to it's original rotation(the defaultTilt).

Have fun!
*/


///////////////////////Fog

// Fog and Ambient light settings
//RenderSettings.ambientLight = Color(0.8,0.8,0.8,1);
RenderSettings.fogDensity = 0.002;
//RenderSettings.fogColor = Color(0,0.5,0.4,1);

// Enable fog
RenderSettings.fog = true;

var  myPitch : float;


	var pingPrefab : Transform;

///////////////////////

var lightSpeed : float = 500;
var propeller : Transform; //the prop object
var speed : float = 50; //the speed we move along just to stay in the air
var turnSpeed : float = 50; //how fast to turn
var climbSpeed : float = 5; //how fast the plane rotates up
var climbLimit : float = 40; //how far the plane can rotate to move up
var diveSpeed : float = 5; //how fast the plane rotates down
var diveLimit : float = 320; //how far the plane can rotate to nose down
var topLimit : float = 1000; //how far the plane can go up
var bottomLimit : float = -1000;//how far the plane can go down

// Speed bar
var barDisplay : float = speed;
var pos : Vector2;
var size : Vector2;
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

var ButtonSound : AudioClip;

private var defaultTilt : Quaternion; //the rotation to return to when a key is not pressed

//shake
var originPosition:Vector3;
var originRotation:Quaternion;
 
var shake_decay: float;
var shake_intensity: float;;

public var ribbon :GameObject;

function Start(){
	// Set up speed bar
	pos = Vector2(700,850);
	size = Vector2(600, 30);

	// Disable ribbon at start
	ribbon = GameObject.Find("EngineRibbon");
	ribbon.SetActive(false);
	
	//if they don't give us a propeller, (try to) assign it automatically
	if(!propeller){
		if(transform.Find("Propeller")){
			propeller = transform.Find("Propeller");
		} else {
			Debug.Log("No propeller assigned");
		}
	}
}

function Update () {


	 // for this example, the bar display is linked to the current time,
	// however you would set this value based on your desired display
	// eg, the loading progress, the player's health, or whatever.
	//barDisplay = Time.time * 0.05;
	barDisplay = speed / 2000;
		

	//shake
	if(shake_intensity > 0){
		transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
		transform.rotation = Quaternion(
		originRotation.x + Random.Range(-shake_intensity,shake_intensity)*.1,
		originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.1,
		originRotation.z + Random.Range(-shake_intensity,shake_intensity)*.1,
		originRotation.w + Random.Range(-shake_intensity,shake_intensity)*.1);
		shake_intensity -= shake_decay;
	}

	if (speed > (lightSpeed - 1)) {

		//turn on trail
		ribbon.SetActive(true);
		} else { 
		ribbon.SetActive(false);
	}

	if (Input.GetKeyDown ("`"))
				speed = 0;
	if (Input.GetKeyDown ("1"))
				speed = 10;
	if (Input.GetKeyDown ("2"))
				speed = 50;
	if (Input.GetKeyDown ("3"))
				speed = 150;
	if (Input.GetKeyDown ("4"))
				speed = 500;
	if (Input.GetKeyDown ("5"))
				speed = 1250;
	if (Input.GetKey ("q"))
				speed--;
	if (Input.GetKey ("e"))
				speed++;
	if (Input.GetKeyDown ("6")) {
				speed = lightSpeed;
				Shake();
	}
	if (Input.GetKeyDown ("c")) {
				
				DoPing();
	}
	
	if(Input.GetKeyDown(KeyCode.F2)) {
		Application.CaptureScreenshot("Screenshot.png");	
	}

	//Engine sound
	/*
	myPitch = speed / 310.0f;
	if (myPitch > 1.4)
		myPitch = 1.4;
		
	if ((speed > 0) && myPitch == 0)
		myPitch = 0.01;

	audio.pitch = myPitch; */
	
	//Engine sound
	if (speed > 150)
		GetComponent.<AudioSource>().pitch = 7.5;
		else {
			GetComponent.<AudioSource>().pitch = speed / 20.0;

		}
	
	
	

	if(propeller)
		propeller.Rotate(0.0, 0.0, 250 * Time.deltaTime * (speed / 20)); //rotate the prop before doing anything else	
	
	defaultTilt = transform.rotation; //if a key is not being pressed we will move back to this rotation
	defaultTilt.x = 0; //and we don't want to be turning if a key isn't held down
	defaultTilt.z = 0;
	
	if(Input.GetAxis("Horizontal") > 0.0){ //if the right arrow is pressed
		transform.eulerAngles.y += turnSpeed * Time.deltaTime; //and then turn the plane
	}
	
	if(Input.GetAxis("Horizontal") < 0.0){ //if the left arrow is pressed
		transform.eulerAngles.y -= turnSpeed * Time.deltaTime;
	}
	
	if(Input.GetAxis("Vertical") > 0.0){ //if the up arrow is pressed
		if(transform.eulerAngles.x < climbLimit || transform.eulerAngles.x > 275){ /*We perform the second check becuase if the user as pressed the down key, the eulerAngles.x variable will have been decreased. Since the variable starts out at 0, decreasing it behaves as though the variable starts at 360(i.e if the plane's rotation is at 0 and you subtract 10 from that, you will end up with a rotation of 350).*/
			transform.eulerAngles.x += climbSpeed * 5 * Time.deltaTime; //nose up
		}
	}
	
	if(Input.GetAxis("Vertical") < 0.0){ //if the dn arrow is pressed		
		if(transform.eulerAngles.x > diveLimit || transform.eulerAngles.x < 275){
			transform.eulerAngles.x -= diveSpeed * 5 * Time.deltaTime; //nose down
		}
	}
	
	if(!(Input.GetAxis("Vertical") || Input.GetAxis("Horizontal"))){ //if an arrow isn't being pressed
		transform.rotation = Quaternion.Slerp(transform.rotation, defaultTilt, 5 * Time.deltaTime); //then return to the default rotation
	}
	
	if (transform.position.y<bottomLimit) transform.position.y = bottomLimit; //constraints
	if (transform.position.y>topLimit) transform.position.y = topLimit; //constraints
	 
	transform.Translate(0, 0, speed * Time.deltaTime); //and move us
}



var bip : AudioClip;

function OnTriggerEnter (other : Collider) {
   
   GetComponent.<AudioSource>().PlayOneShot(bip);
   
}




function OnGUI () {

		

		//Back to the Menu
		if(GUI.Button ( Rect(Screen.width - 60,10,50,20), "Restart")){
				
				GetComponent.<AudioSource>().PlayOneShot(ButtonSound);
				Application.LoadLevel (0);
		}
		
		//Back to the Menu
		if(GUI.Button ( Rect(Screen.width - 360,10,50,20), "Exit")){
				
				GetComponent.<AudioSource>().PlayOneShot(ButtonSound);
				Application.Quit();
		}
		
		GUI.Box( Rect(320, 50, 150, 50), "" + speed);
	
	
	//	GUI.Box( Rect(1, 1, 150, 50), "pitch: " + (speed / 20.0));
	
		// energy bar
		// draw the background:
		GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
		GUI.Box (Rect (0,0, size.x + 20, size.y + 20),progressBarEmpty);
		 
		// draw the filled-in part:
		GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
		GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
		GUI.EndGroup ();
		 
		GUI.EndGroup (); 
		}

function Shake(){
	originPosition = transform.position;
	originRotation = transform.rotation;
	shake_intensity = .3;
	shake_decay = 0.002;
}

function DoPing() {
	Instantiate(pingPrefab, transform.position, Quaternion.identity);
}