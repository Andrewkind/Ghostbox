using UnityEngine;
using System.Collections;

public class PingScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(Vector3.up * Time.deltaTime * 1000);
		transform.localScale += new Vector3(0.1f,0.1f,0.1f);
	}
}
