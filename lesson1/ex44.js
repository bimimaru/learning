function throwError() {
    console.log('This function will throw error')
    throw new Error("Error Here!")
    try {
        throwError();
    } catch (BeforeError) {

    }
}

console.log('Before error')
throwError()
console.log('After error')