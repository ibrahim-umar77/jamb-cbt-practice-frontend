function LoadingWorkflow(){

const steps = [

"Extracting Content",

"Finding Technical Claims",

"Classifying Claims",

"Retrieving Evidence",

"Evaluating Accuracy",

"Detecting Bias",

"Generating Neutral Explanation"

];


return (

<div>

<h2>
Analysis Progress
</h2>


<ul>

{

steps.map((step,index)=>(

<li key={index}>
{step}...
</li>

))

}

</ul>


</div>

)

}


export default LoadingWorkflow;