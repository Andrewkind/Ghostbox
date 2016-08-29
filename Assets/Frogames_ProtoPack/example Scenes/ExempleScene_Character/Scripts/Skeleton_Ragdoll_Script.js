var SkeletonSound : AudioClip; 

function Start () 
{
		GetComponent.<AudioSource>().PlayOneShot(SkeletonSound);
		Destroy (gameObject,5.0);
}












