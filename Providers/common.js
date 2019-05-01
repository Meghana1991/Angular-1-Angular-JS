var app = angular.module("bmw",[]);
app.value("customValue","I am a value");
/**
1) Whenever any provider or (service or factory also) gets injected, then the provider gets saved and whenever accessed next would be picked from the place saved.So only one the call to the provider happens.

2) Main business logic should be in providers(provider or factory or service) as it is reused and singleton and invoked only once
*/

/** Here is the first difference **/
/** ----------------------------------------------------------**/
app.factory("myFact1",function(){
	return "I am factory"
});

app.service("myServ1",function(){
	return "i am factory"
});
/** ----------------------------------------------------------**/

app.factory("myFact2",function(){
	var myObj = {};
	myObj.value = 10;
	myObj.setVal = function(){
		return myObj.value;
	}
	return myObj;
});

app.service("myServ2",function(){
	this.value = 10;
	this.setVal = function(){
		return this.value;
	}
});

/** ----------------------------------------------------------**/
/**
	Other than the first example mentioned above about returning the VALUE in factory, there is no other difference technically. However, there is main difference usage wise and when to use what?

	Assume a  bmw car company present. I want to use factory in a situation where i can create multiple objects based on the customer requirement like red blue yellow car objects. Factory are best suited for this purpose where you can have objects for these types.Usually thats what the object does in reality where it will have properties of some element(here el is car).So car properties are stored in object hence use a factory
**/
app.factory("bmwSpecification",function(){
	return function(color,description,modelNo){
		return {
			color : color,
			description : description,
			modelNo : modelNo,
			printDetails : function(){
				//logic for cost calculation
				console.log("Details are - "+modelNo+" "+description+" "+modelNo);
			}
		}
	}
});

/**
	Services are used when you have a set of common functionality which doesn't hold up much information or which needn't have any information(may be empty constructor) and all you use the service is just for similar or common functionlity to be present in multiple places.Like say the http calls.

	This shows how the CarService will always a produce a car with 4 cylinders, you can't change it for individual cars. Whereas bmwSpecification returns a function so you can do new bmwSpecification in your controller, passing in a number of cylinders specific to that car. You can't do new CarService because CarService is an object not a function.

	So service is like a template with common features and however you can add or customise them using factory.

	Service = These puppies get passed around regularly, ensuring that you’re dealing with the same object each time, unlike factories.
**/

app.service("bmwCommonService",function(){
//These information doesn't usually change for car to car 
	this.tyres = 4;
	this.airBalloons = true;
});
/** ----------------------------------------------------------**/

//Providers are used during the configuration time at the beginning.
//Providers, $get method gets called automatically by the Angular when injected
//Usually providers are used to store values

app.provider("bmwProvider",function(){
	this.adminType = "admin"
	this.setType = function(adminType){
		this.adminType = adminType;
	}

	this.$get = function(){
		return this.adminType;
	}
});
/** ----------------------------------------------------------**/
function Person(name){
	this.name = name;
}

app.factory("factoryTest",function(){
	return new Person("Abc")
});

app.service("serviceTest",function(){
	return new Person("Def")
});
/** ----------------------------------------------------------**/
// Usually for storing some value you can use Value instead Factory

// Accessed during the configuration phase also
// the value remains constant through the app and doesn't change
app.constant("customConstant", "I am a constant");
/** ----------------------------------------------------------**/
app.controller("bmwController1",function(myFact1,myFact2,myServ1,myServ2,bmwSpecification,bmwCommonService,bmwProvider,factoryTest,serviceTest,customConstant,customValue){
	console.log(myFact1); //I am factory
	console.log(myServ1); // Object {}

	console.log(myFact2.setVal()); //10
	console.log(myServ2.setVal()); //10

// Assume this as a class (in reality it is a function)
	console.log(bmwSpecification); //returns a function definition (even a service can return the same no wonder) function(){....}

// Invoke the class or function with a new keyword which returns a object of the class as new does it
	console.log(new bmwSpecification("green","hatchback","1029"))//Object {color: "green", description: "hatchback", modelNo: "1029", printDetails: function}

// Inside the object created, call the printDetails function
	console.log(new bmwSpecification("green","hatchback","1029").printDetails()) //Details are - 1029 hatchback 1029

	console.log(bmwCommonService) //Object {tyres: 4, airBalloons: true}
	console.log(bmwCommonService.tyres) //4
bmwCommonService.tyres = 5;
	console.log(bmwProvider);//admin // $get gets called automatically FOR FIRST TIME BEFORE THE config FUNCTION is CALLED
	console.log(bmwProvider); // New Value

// Both does the same thing and no difference
	console.log(factoryTest.name); //Abc
	console.log(serviceTest.name); //Def

	console.log(customConstant)
	console.log(customValue)
});

app.controller("bmwController2",function(myFact1, bmwCommonService){
	
console.log(bmwCommonService.tyres) //4
});
//This is configuration phase where one can use only provider for injection and not Factory or Service
// Only the Provider and CONSTANT can be changed during the configuration phase
app.config(function(bmwProviderProvider,customConstant){
	bmwProviderProvider.setType("New Value");
	console.log("customConstant " + customConstant);
	customConstant = "hey"; // You can change and change doesn't reflect
});