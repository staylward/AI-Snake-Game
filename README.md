# SNAKE BRAIN

### How to run
Open the index.html in chrome.  
Press start to start the game.  
Any time you change your snake, you will need to reload the page!  

## Challenge #1

1. Currently the snake will only move to the left.  
2. Can you try make the snake move down?  
  * Can you make the snake move up?  
  * Can you make the snake move to the right?  
3. Why can the snake not move to the right?  



## Challenge #2

At the moment the snake is not very smart.  
He will be a very hungry snake if he does not become smarter!  
To make our snake **smarter** we will need to add questions to our snake brain.  
  
In programming we ask the computer questions with the word **if**!  
Here is an example you might ask every day.  
  
```javascript
if (today_is_a_school_day()) {
	go_to_school()
}
else {
	enjoy_the_weekend()
}
```
  
Just like you would ask if today is a school day, your snake will want to know where the apple is!  
Here is an example of the snake checking if the apple is above or below it's head.  
  
```javascript
if (apple_is_above()) {
	move_???()
}
else {
	move_down()
}
```
  
1. What would you replace the **???** with in this last example?
2. Make the change and copy this code into your snake brain!
3. What happens, does your snake get the apple?
4. The only way the snake can get the apple, is if it becomes **smarter**!

## Challenge #3

So we know that we can check to see if the apple is above, but what if we want to check if the apple is in another direction?  
For this we will need to have more questions for our snake brain!  
In this following example, we will ask more questions about our week.  

```javascript
if (today_is_a_school_day()) {
	go_to_school()
}
else if (today_is_Saturday()) {
	go_to_sport()
}
else {
	go_to_the_beach()
}
```

In the example above, if the day was Monday, Tuesday, Wednesday, Thursday, or Friday, you would go to school.  
If it was not any of those days, and if it was Saturday, then you would go to sport.  
And if it was not any of those school days and it was not Saturday, you would go to the beach!  

We can do the same thing with our snake brain!  

```javascript
if (apple_is_above()) {
	move_???()
}
else if (apple_is_below()) {
	move_???()
}
else if (apple_is_left()) {
	move_???()
}
else {
	move_???()
}
```

1. Update the missing ??? commands and then put this in the snake brain.
2. Is your snake hungry now?
3. How long can the snake get before he runs into a problem?

## Challenge #4

So now our snake brain can move in the direction of the food, but what if the snake tail gets in the way?  
It is almost like we need our snake brain to become **smarter**!  
To make the the brain smarter we will need to ask more **questions**.  

Here is an example of more questions for your school days.  

```javascript
if (today_is_a_school_day()) {
	if (today_is_a_mufti_day()) {
		wear_casual_cloths()
	}
	else {
		wear_school_uniform()
	}
	go_to_school()
}
else {
	enjoy_the_weekend()
}
```

We can do the same thing with our snake brain!  
Here is an example to get you started.  

```javascript
if (apple_is_above()) {
	if (tail_is_not_above()) {
		move_up()
	}
	else {
		move_left()
	}
}
```

1. Did you understand this?
⋅⋅* First we check to see if the apple is up.
⋅⋅* Then we check to see if there is no tail above us.
⋅⋅* Then we can move up!
⋅⋅* But if there was some snake tail above us.
⋅⋅* Then we move to the left.
2. What is wrong with moving only to the left?
3. How could you add this to the other directions?
4. What if the backup direction has tail there also?

## Challenge #Extra-Time

This one can be really hard, but it only uses what you have already learned!  
In your snake.js file, search further down into the extra code further down.  
Look for the following line: 
**config.number_obstacles = 0;**  
It should be only a bit further down from your snake brain.  
Change the 0 at the end to a 5 (Or more if you are **brave**).  

1. What has changed?
2. How can you avoid all the obstacles?
3. How long can your snake become?

