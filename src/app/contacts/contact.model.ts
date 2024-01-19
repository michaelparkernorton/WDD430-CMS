export class Contact {
	constructor(
		public id: string, 
		public name: string, 
		public email: string, 
		public phone: string, 
		public imageUrl: string, 
		public group?: Contact[]
	){}
}

// export class Recipe {
// 	public name: string;
// 	public description: string;
// 	public imagePath: string;

// 	constructor(name: string, desc: string, imagePath: string) {
// 		this.name = name;
// 		this.description = desc;
// 		this.imagePath = imagePath;
// 	}

// }