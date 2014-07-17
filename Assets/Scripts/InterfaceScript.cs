using UnityEngine;
using System.Collections;

public class InterfaceScript : MonoBehaviour {
	
	private Texture2D interfaceTexture;
	public Texture btnTexture;
	

	
	
	// Use this for initialization
	void Start () {
		interfaceTexture = Resources.Load ("Images/" + "interfaceImage") as Texture2D;
		//btnTexture = Resources.Load ("Images/" + "btnImage") as Texture2D;
		
		
	}
	
	// Update is called once per frame
	void Update () {
			
	}
	
	void OnGUI() {
		
		//Draw the interface
		GUI.DrawTexture(new Rect(0, 0, 1920, 1080), interfaceTexture, ScaleMode.StretchToFill, true, 10.0F);
		
		//Write the target information
		//SecondCameraScript secCamScript;
		//secCamScript = (SecondCameraScript)GameObject.Find("Camera2").GetComponent(typeof(SecondCameraScript));
		GameObject player = GameObject.Find("player");
		
		
		//secCamScript = (SecondCameraScript)GameObject.Find("Camera2").GetComponent(typeof(SecondCameraScript));
		
		//Coordinate system
		//coordinates
		GUI.Box(new Rect(120, 30, 150, 50), "Current Location:");
		GUI.Box(new Rect(120, 50, 150, 50), "" + (int)player.transform.position.x + " " + (int)player.transform.position.y + " " + (int)player.transform.position.z); 
		
		// Speed (need a guage bar)
		GUI.Box(new Rect(320, 30, 150, 50), "Current Speed:");

		//help box
		GUI.Box(new Rect(20, 130, 200, 25), "Movement: AWSD");
		GUI.Box(new Rect(20, 158, 200, 25), "Speed: 1-6 (6 is boost)");
		GUI.Box(new Rect(20, 178, 200, 25), "Speed: Q and E");
		GUI.Box(new Rect(20, 198, 200, 25), "Drop Charge: C");



			
		//GUI.Label (new Rect(90, 30, 150, 50), "Target: None"); 

		
		//put a Engage button
		//GUI.Box(new Rect(1700, 830, 100, 50), "Engage!");
		//GUI.Box(new Rect(1700, 950, 150, 50), "Set Target!");
		if (!btnTexture) {
			//			Debug.LogError("Please assign a texture on the inspector");
			return;
		}

		// Mouse popsition box
		Vector2 mousePosition = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
		GUI.Box(new Rect(550, 980, 150, 50), "Mouse Coords: " + mousePosition.x + " " + mousePosition.y);
		
		

		
		//if (GUI.Button(new Rect(280, 700, 150, 50), "Map Button")) {
			//toggle map?
		//}
		
	} 
}
