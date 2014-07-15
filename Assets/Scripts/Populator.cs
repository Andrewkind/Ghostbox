using UnityEngine;
using System.Collections;

public class Populator : MonoBehaviour {
	
	public Transform linePrefab;
	public Transform planetPrefab;

	// Use this for initialization
	void Start () {

		int clusterCount = 10;

		for (int j = 0; j < clusterCount; j++) {

			float clusterMulti = Random.Range(-10.0f, 10.0f);

			int i = 0;
			while (i < 300) {
				Instantiate(linePrefab, new Vector3(Random.Range(-1000.0F, 1000.0F) * clusterMulti, Random.Range(-1000.0F, 1000.0F * clusterMulti), Random.Range(-1000.0F, 1000.0F * clusterMulti)), Quaternion.identity);
				Instantiate(planetPrefab, new Vector3(Random.Range(-1000.0F, 1000.0F * clusterMulti), Random.Range(-1000.0F, 1000.0F * clusterMulti), Random.Range(-1000.0F, 1000.0F * clusterMulti)), Quaternion.identity);

				i++;
			}
		
		}
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
