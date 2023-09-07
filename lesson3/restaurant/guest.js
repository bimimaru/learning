class Guest {
    constructor(name, phoneNumber, email, birthday) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.isVIP = false;
        this.promoteDate = undefined;
        this.promoteEndDate = undefined;
        this.suggestNewDish = []
        this.birthday = birthday;
        this.spentAmount = 0;
        setInterval(() => {
            this.resetSpentAmount();
        }, 5000)
    }
    resetSpentAmount() {
        this.spentAmount = 0
    }
}
module.exports = { Guest }