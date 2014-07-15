using UnityEngine;
using System.Collections;

public class PlanetScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
	

		float randomSize = Random.Range(20.0f, 150.0f);
		transform.localScale = new Vector3(randomSize, randomSize, randomSize);

	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
