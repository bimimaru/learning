
function lightweightTask() {
    console.log('Light task completed!');
}



async function heavyWeightTask() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')

    return response.json();
}

async function run() {
    console.log(Date.now());

    const result = await heavyWeightTask();
    console.log(result);


    console.log('Fetch finished')


    console.log(Date.now());
}

run()