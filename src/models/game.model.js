
class Game {

	constructor(name, prod, yr, tp, userID) {
		this.name = name.trim();
		this.producer = prod;
		this.year = yr;
		this.type = tp;
		this.userid = userID;
	}

}

module.exports = Game