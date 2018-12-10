
class Game {

	constructor(name, prod, yr, tp, userid) {
		this.name = name.trim();
		this.producer = prod;
		this.year = yr;
		this.type = tp;
		this.userid = userid;
	}

}

module.exports = Game