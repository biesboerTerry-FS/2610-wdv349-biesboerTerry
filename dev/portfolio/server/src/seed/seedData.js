export const coaches = [
	{
		firstName: "Morgan",
		lastName: "Blake",
		title: "Boys Ultimate Coach",
		role: "head_coach",
		email: "morgan.blake@example.com",
		program: "high-school",
		division: "Boys",
		displayOrder: 1,
		photoUrl: "https://i.pravatar.cc/400?u=morgan",
		bio: "Coach Morgan leads the Lindbergh High School boys program and hosts Power Lunch.",
	},
	{
		firstName: "Taylor",
		lastName: "Quinn",
		preferredName: "T",
		title: "Gxrls Team Coach",
		role: "head_coach",
		email: "taylor.quinn@example.com",
		program: "high-school",
		division: "Gxrls",
		isBoosterContact: true,
		displayOrder: 2,
		photoUrl: "https://i.pravatar.cc/400?u=taylor",
		bio: "Coach T leads the Gxrls program and was named Coach of the Year in 2023.",
	},
	{
		firstName: "Casey",
		lastName: "Brooks",
		preferredName: "Brooks",
		title: "Boys Team Coach",
		role: "assistant_coach",
		email: "casey.brooks@example.com",
		program: "high-school",
		division: "Boys",
		displayOrder: 3,
		photoUrl: "https://i.pravatar.cc/400?u=casey",
	},
	{
		firstName: "Jordan",
		lastName: "Ellis",
		title: "Gxrls Team Coach",
		role: "assistant_coach",
		email: "jordan.ellis@example.com",
		program: "high-school",
		division: "Gxrls",
		isBoosterContact: true,
		displayOrder: 4,
		photoUrl: "https://i.pravatar.cc/400?u=jordan",
	},
];

export const boosterMembers = [
	{
		name: "Jordan Ellis",
		role: "President",
		roleKey: "president",
		email: "jordan.ellis@example.com",
		displayOrder: 1,
	},
	{
		name: "Riley Hayes",
		role: "Secretary",
		roleKey: "secretary",
		email: "riley.hayes@example.com",
		displayOrder: 2,
	},
	{
		name: "Avery Bennett",
		role: "Co-Treasurer",
		roleKey: "treasurer",
		email: "avery.bennett@example.com",
		displayOrder: 3,
	},
	{
		name: "Cameron Price",
		role: "Co-Treasurer",
		roleKey: "treasurer",
		email: "cameron.price@example.com",
		displayOrder: 4,
	},
	{
		name: "Reese Morgan",
		role: "Vice-President",
		roleKey: "vice_president",
		email: "reese.morgan@example.com",
		displayOrder: 5,
	},
	{
		name: "Quinn Collins",
		role: "Alumni Rep",
		roleKey: "alumni_rep",
		email: "quinn.collins@example.com",
		displayOrder: 6,
	},
	{
		role: "Middle School Rep",
		roleKey: "middle_school_rep",
		isOpenPosition: true,
		status: "open",
		displayOrder: 7,
	},
	{
		name: 'Taylor "T" Quinn',
		role: "Gxrls Team Coach",
		roleKey: "coach",
		email: "taylor.quinn@example.com",
		displayOrder: 8,
	},
	{
		name: "Morgan Blake",
		role: "Boys Team Coach",
		roleKey: "coach",
		email: "morgan.blake@example.com",
		displayOrder: 9,
	},
	{
		name: "Casey Brooks",
		role: "Boys Team Coach",
		roleKey: "coach",
		email: "casey.brooks@example.com",
		displayOrder: 10,
	},
	{
		role: "Gxrls Team Historian",
		roleKey: "historian",
		isOpenPosition: true,
		status: "open",
		displayOrder: 11,
	},
	{
		role: "Boys Team Historian",
		roleKey: "historian",
		isOpenPosition: true,
		status: "open",
		displayOrder: 12,
	},
];

export const faqs = [
	{
		question: "Does my child need prior Ultimate experience to participate?",
		answer:
			"Absolutely not! All are welcome regardless of experience, athletic ability, etc. Coaches will teach everything players need to know.",
		category: "general",
		displayOrder: 1,
	},
	{
		question: "What is the time commitment during the season (practices, games, tournaments)?",
		answer:
			"High School: Two 2 hour practices a week, 1-2 games a week. Middle School: One 1 hour practice a week, occasional scrimmage.",
		category: "season",
		displayOrder: 2,
	},
	{
		question: "When does the season run?",
		answer:
			"High School: Late February - Early May. Middle School: Late August - Early December.",
		category: "season",
		displayOrder: 3,
	},
	{
		question: "Where are practices held, and what happens if locations change?",
		answer:
			"Practices are held at Truman Middle School, and we typically do not ever cancel a practice. If we need to move indoors, we will either play in the gym or discuss film in a classroom. Families will be notified via email and/or SportsYou.",
		category: "practices",
		displayOrder: 4,
	},
	{
		question:
			"What transportation options are available to help get players to/from practices & games?",
		answer:
			"High School: There is a bus that goes directly from the high school to Truman Middle School that many students choose to ride. Additionally, upperclassmen quite often arrange carpools to help teammates get to practice & games. Middle School: Sperreng Families use this GroupMe to arrange carpools to help get kids to and from Truman after school. Truman Students may sign up for the Activity Bus to get home after practices.",
		category: "transportation",
		link: { label: "GroupMe", href: "#" },
		displayOrder: 5,
	},
	{
		question: "What happens if my child has another sport or activity?",
		answer:
			"All the Lindbergh coaches are very passionate about this sport and getting more kids exposed to it, so we are happy to work with their schedules and find a plan that works for everyone.",
		category: "season",
		displayOrder: 6,
	},
	{
		question: "What equipment or gear does my child need?",
		answer:
			"Water bottle, athletic clothes, and cleats are strongly encouraged. We do have some gently used cleats for players who may need financial assistance.",
		category: "general",
		displayOrder: 7,
	},
	{
		question:
			"What costs are associated with the program, and what does the registration fee include?",
		answer:
			"High School: Please review our Season Info Packet, located toward the bottom of our High School Page, for current season information. Middle School: Annual $10 Activity Fee should be paid to the office; this fee covers all middle school activities for the calendar year.",
		category: "costs",
		link: { label: "High School Page", to: "/high-school" },
		displayOrder: 8,
	},
	{
		question: "How is playing time determined?",
		answer:
			"High School: Coaches typically use practice attendance to determine playing time, especially for the Missouri State Tournament. Middle School: All players get equal playing time.",
		category: "practices",
		displayOrder: 9,
	},
	{
		question: "How will families receive updates and important information?",
		answer: "High School: SportsYou! Middle School: Email.",
		category: "general",
		link: { label: "SportsYou", to: "/sportsyou" },
		displayOrder: 10,
	},
	{
		question: "How can parents and families get involved or support the program?",
		answer:
			"Spread the word about our program, email your district administrators about the positive impact you believe Ultimate can have on kids, use your professional connections, join the Lindbergh Ultimate Booster Club!",
		category: "general",
		link: { label: "Lindbergh Ultimate Booster Club!", to: "/booster-club" },
		displayOrder: 11,
	},
	{
		question: 'What "Spirit of the Game" behavior is expected from spectators?',
		answer:
			'On an Ultimate sideline, encouragement and support are emphasized. Cheering is encouraged, but never at the expense of respect for all players, fans, and officials. Friends and family can support their teams in many ways. Some positive and helpful forms of support include: Create and share a team roster with other friends and family. Provide team drinks and snacks to maintain energy necessary for competing and remaining healthy. Bring tents for shade in hot or rainy weather. Cheer for the team and individuals. Encourage spirit and conflict resolution among players by listening quietly when calls are made and allowing them to make the final decision without receiving feedback from the crowd. Take pictures to share with the team after the event. Wear team colors and make posters or banners. Stay positive! Celebrate good plays and defense; refrain from booing or negative comments.',
		category: "spirit",
		displayOrder: 12,
	},
];

export const testimonials = [
	{
		quote:
			"I have made long lasting friendships, gained so much confidence and leadership experience, and found a sport that I'm going to love for the rest of my life! It is such a cool community of people and an amazing environment to be a part of. Not just Lindbergh Ultimate, but the Saint Louis community in general is so welcoming to anyone who wants to try it out.",
		authorName: "Nora Delgado",
		authorType: "player",
		attribution: "Nora Delgado (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 1,
	},
	{
		quote:
			"Playing ultimate has shaped me into the leader I am today and has build my confidence both on and off the field. It opens you up to an incredibly supportive and kind community for all ages.",
		authorName: "Maya Patel",
		authorType: "player",
		attribution: "Maya Patel (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 2,
	},
	{
		quote:
			"Ultimate's unique Spirit of the Game has given our son a place to play hard and have fun! The positive attitudes of players, coaches, and spectators truly makes this sport exceptional.",
		authorName: "Riley Hayes",
		authorType: "parent",
		attribution: "Riley Hayes (Parent)",
		displayOrder: 3,
	},
	{
		quote:
			"As a parent, I couldn't be more impressed with the Lindbergh Flyers Ultimate Frisbee team. The coaching staff is outstanding—so knowledgeable about the sport and so dedicated to the players. I saw how they invested in my daughter not just as an athlete, but as a person—offering support in school, other interests, and personal growth. The team atmosphere is incredibly welcoming—every skill level is embraced, and it's just a joy to watch them grow both on and off the field. I'm so grateful for this amazing team!",
		authorName: "Dana Whitfield",
		authorType: "parent",
		attribution: "Dana Whitfield (Parent)",
		displayOrder: 4,
	},
	{
		quote:
			"Ultimate has given me a community and friends as well as really valuable leadership experience that I feel like I have learned a lot from. It's one the most welcoming sports out there, and a place where you can get some energy out in a really fun way!",
		authorName: "Elena Whitfield",
		authorType: "player",
		attribution: "Elena Whitfield (Player, c.o. 2025)",
		graduationYear: 2025,
		displayOrder: 5,
	},
	{
		quote:
			"It's a low-risk sport compared to the ones at the high school that's not as popular but it's just as fun that can help you build athleticism whether you're getting into sports or on an off season of another sport.",
		authorName: "Sofia Tran",
		authorType: "player",
		attribution: "Sofia Tran (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 6,
	},
	{
		quote:
			"Ultimate has helped my son build confidence, learn teamwork and is a fun outlet for his competitive spirit!",
		authorName: "Priya Nair",
		authorType: "parent",
		attribution: "Priya Nair (Parent)",
		displayOrder: 7,
	},
	{
		quote:
			"Ultimate gave my son a great way to stay active, introduced him to a new sport, and helped him make new friends.",
		authorName: "Erin Foster",
		authorType: "parent",
		attribution: "Erin Foster (Parent)",
		displayOrder: 8,
	},
	{
		quote:
			"We've enjoyed the ultimate frisbee program at Truman. It's well organized, and the coaches are accepting of all skill levels, so it helps the kids build confidence while having fun.",
		authorName: "Marcus Reed",
		authorType: "parent",
		attribution: "Marcus Reed (Parent)",
		displayOrder: 9,
	},
	{
		quote: "Ultimate has been a very positive experience for my son's physical and social health.",
		authorName: "Hannah Cole",
		authorType: "parent",
		attribution: "Hannah Cole (Parent)",
		displayOrder: 10,
	},
	{
		quote:
			"The team camaraderie is incredible! As a first time player, my daughter felt a part of the team from day one! Thank you Coach T, I know you have created this wonderful atmosphere! It's so easy to play hard when you're having so much fun!!!",
		authorName: "Laura Simmons",
		authorType: "parent",
		attribution: "Laura Simmons (Parent)",
		fullWidth: true,
		displayOrder: 11,
	},
];

export const highlights = [
	{ category: "girls", title: "Missouri State Champions", years: [2017, 2018, 2019, 2025], displayOrder: 1 },
	{ category: "girls", title: "Missouri State Spirit Award", years: [2021, 2024], displayOrder: 2 },
	{
		category: "girls",
		title: "All",
		years: [2017, 2018, 2019, 2021, 2024, 2025],
		displayOrder: 3,
	},
	{
		category: "boys",
		title: "Missouri State Spirit Award - D1",
		years: [2021],
		displayOrder: 1,
	},
	{
		category: "boys",
		title: "Missouri State Spirit Award - D2",
		years: [2025],
		displayOrder: 2,
	},
	{ category: "boys", title: "All", years: [2021, 2025], displayOrder: 3 },
	{
		category: "coaches",
		title: "Coach of the Year Recipient - Taylor 'T' Quinn",
		recipients: ["Taylor Quinn"],
		years: [2023],
		displayOrder: 1,
	},
	{ category: "coaches", title: "All", years: [2023], displayOrder: 2 },
	{
		category: "players",
		title: "Nina Alvarez - Heart of the Lyons Recipient",
		recipients: ["Nina Alvarez"],
		years: [2019],
		displayOrder: 1,
	},
	{
		category: "players",
		title: "Elena Whitfield - Heart of the Lyons Recipient",
		recipients: ["Elena Whitfield"],
		years: [2024],
		displayOrder: 2,
	},
	{
		category: "players",
		title: "Maya Patel - Heart of the Lyons Recipient",
		recipients: ["Maya Patel"],
		years: [2025],
		displayOrder: 3,
	},
	{ category: "players", title: "All", years: [2019, 2024, 2025], displayOrder: 4 },
];

export const galleries = [
	{
		title: "Flyers Ultimate Gxrls 2026",
		coverImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
		year: 2026,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipN_s7R53YpcmoePuxccClXAgCYdoWVImNxCC1yC-FsqMH4AZFldh-OkLosFhHiy-Q?pli=1&key=RHdqZFVzZ1hVa1BrazRYM1pCNnJ3M0JYaS1tTmx3",
		displayOrder: 1,
	},
	{
		title: "Flyers Ultimate Boys 2026",
		coverImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
		year: 2026,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipONdTfJ2Lgxiy6Yd4dIWkXbhlZwW0UcGU5KQZLFtK4mwsvSJWt4QIAtMaZSEESuZw?key=WDRzT3d5MWZ3X2dtbEJaaU41S29IUjZ4Uy1hYUdR",
		displayOrder: 2,
	},
	{
		title: "Middle School",
		coverImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
		year: 2025,
		program: "middle-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipP1koCHSPexyQNG_IUAm1BnRgTlQNDpTwx7tif4s6JSzAcGv9oy_ry_u6TPyiBLsw?key=OUVpaG5ZX3J2M2g2YVh6T0p3bjlkNjhYYmRYMV9R",
		displayOrder: 3,
	},
	{
		title: "2025 SLUJ All Star Game",
		coverImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
		year: 2025,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipP2fDDJN_WgEab-p3JHDX-JuopK8Lyo3B6nM_JolkOGsIhhgr2XyfsKqnk5o_09uQ?key=elltR3gwcndzakQzODJyTFI3M3hIbGdqUktXRzNn",
		displayOrder: 4,
	},
	{
		title: "Flyers Ultimate 2025",
		coverImageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
		year: 2025,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipOcPh_ctBoNHykAyEaq8eCcRSzixjY7r_d-LlVdl5tqYh5OAAOl0VT4MzR7LQOmyg?key=VEQwY2c1WXZvVGNxNWJYcXdibTM3bTUxbS1pcHln",
		displayOrder: 5,
	},
	{
		title: "Flyers Ultimate 2024",
		coverImageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
		year: 2024,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipM5YhT8PCVXQYTHDwW5t6kpooMS1QQ5blqMGmXEr3IOrsRbfqg0ozdCObjzqHmmPg?key=MzZuX1R4Q3V5TkFoZGdjUFpDcHE1ZTJXbTNBQjdR",
		displayOrder: 6,
	},
	{
		title: "Flyers Ultimate 2023",
		coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
		year: 2023,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipP-NpdnvI1Hz3fXfE8MG0ASZMUZNCul_GBUaK1rMnKkvEobK8XcHrE6Rmk3vZfBpQ?key=R0kwdE93b0NOQmZVVnRRUjNYWTBLWTFYM0owNHdB",
		displayOrder: 7,
	},
	{
		title: "2023 High School State Championship",
		coverImageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80",
		year: 2023,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipOHQ45tAaX6yqGnZrZfJtzZTeOkH1CAbr7ETJINaBKivE7dsnuvUOUdXdB_4e0_oA?key=Skl4RjZCOFlDSWZiaFJ2MG9GcjJyN084cm9JU21n",
		displayOrder: 8,
	},
	{
		title: "Lady Flyers Ultimate 2022",
		coverImageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
		year: 2022,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipO8cVHT1KOtX6k3ri3SA2iUvn84jHsGatvUjIA3-EhBWZbJBCkz11Gon7tROcwt_g?key=VmtTUmFyalBvVTRiMm9MTjR6T1JoMV9aMHM0eTV3",
		displayOrder: 9,
	},
	{
		title: "Lady Flyers Ultimate 2021 Season",
		coverImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
		year: 2021,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipNuhbQF19n6IExhkScUoK1zgbiAZBc2QLr540rERR-C_XvMB9vfo8remXw1fd-qaQ?key=dVc4N0d5WmRwYzBlUUViUXhBZVdGV0ZlbHN2cjFB",
		displayOrder: 10,
	},
	{
		title: "Lindbergh Lady Flyers Ultimate Team History",
		coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
		year: 2020,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipP5XpJmgSG4-JCqclVZqbMdwSn7lkO8ODqptLscH9ddH9kFFBC7vtCQ5TvtBMOZJQ?key=QzFFaTBoMmY2ZHllUFg1VS00dk1wbkhCbEJ1SE5B",
		displayOrder: 11,
	},
	{
		title: "Boys Flyers Ultimate 2021 Season",
		coverImageUrl:
			"https://lh3.googleusercontent.com/pw/AP1GczNj9oZBGE2rewCGMV1-MDEiGV2O8MWkXRE7oHPQtxJpVD05sWUrfYl8mmm9Io4rp45NN5oKqHusiAOhPhxEaNZAKBj-2ca_3L6Xqsqb6j3ms92vG-Q=w1200",
		year: 2021,
		program: "high-school",
		externalUrl:
			"https://photos.google.com/share/AF1QipMVnKqJwpU0_651McEagsog4LuOPOfCUXQMZvymyY83xZb7cWpkVCREi4hsmDV28Q?key=bzVSd3oyMEF6S0VkVzlWTHg2NGdubUJiSUZieV9n",
		displayOrder: 12,
	},
];

export const mediaItems = [
	{
		title: "Gxrls State Championships 2021",
		type: "video",
		videoId: "HIKvPYdtd50",
		url: "https://www.youtube.com/watch?v=HIKvPYdtd50",
		year: 2021,
		program: "high-school",
		displayOrder: 1,
	},
	{
		title: "Flyers News Broadcast 3/6/25 Ultimate Segment",
		type: "video",
		videoId: "vdbEz3rHC_Y",
		url: "https://www.youtube.com/watch?v=vdbEz3rHC_Y&t=196s",
		year: 2025,
		duration: "3:15",
		program: "high-school",
		displayOrder: 2,
	},
];

export const emailLists = [
	{
		name: "General Announcements",
		slug: "general",
		description: "Site-wide news, program updates and important dates.",
		audience: "all",
		isPublic: true,
	},
	{
		name: "Interest List",
		slug: "interest",
		description: "Students and families who asked to hear about upcoming opportunities.",
		audience: "interest",
		isPublic: true,
	},
	{
		name: "Players",
		slug: "players",
		description: "Current and registered players.",
		audience: "players",
	},
	{
		name: "Parents & Guardians",
		slug: "parents",
		description: "Parents and guardians of current players.",
		audience: "parents",
	},
	{
		name: "Coaches",
		slug: "coaches",
		description: "Coaching staff communications.",
		audience: "coaches",
	},
	{
		name: "Booster Club",
		slug: "boosters",
		description: "Booster club members, volunteers and fundraising updates.",
		audience: "boosters",
	},
	{
		name: "Alumni",
		slug: "alumni",
		description: "Lindbergh Ultimate alumni.",
		audience: "alumni",
	},
];

export const siteSettings = [
	{
		key: "contact.email",
		label: "Program contact email",
		category: "contact",
		value: "contact@example.com",
	},
	{
		key: "social.instagram",
		label: "Instagram URL",
		category: "social",
		value: "https://www.instagram.com/lindberghultimate/",
	},
	{
		key: "program.mission",
		label: "Program mission",
		category: "content",
		value:
			"Our mission is to advance the sport of Ultimate at Lindbergh by enhancing and promoting Character, Community, and Competition.",
	},
	{
		key: "registration.spring2026.title",
		label: "Spring 2026 registration title",
		category: "registration",
		value: "2026 Lindbergh Ultimate Spring Registration",
	},
	{
		key: "sportsyou.accessCode",
		label: "SportsYou access code",
		category: "program",
		value: "SAMPLE-CODE",
	},
	{
		key: "sportsyou.url",
		label: "SportsYou URL",
		category: "program",
		value: "https://www.sportsyou.com",
	},
	{
		key: "usaUltimate.membershipUrl",
		label: "USA Ultimate membership URL",
		category: "program",
		value: "https://www.usaultimate.org/membership/",
	},
	{
		key: "teamStore.url",
		label: "Team store URL",
		category: "program",
		value: "https://altjerseys.com/team/flyers/",
	},
	{
		key: "fundraiser.campaignSlug",
		label: "Featured fundraiser campaign",
		category: "fundraiser",
		value: "2026-lindbergh-ultimate-program-fundraiser",
	},
	{
		key: "powerLunch.details",
		label: "Power Lunch details",
		category: "content",
		value: {
			day: "Wednesdays",
			time: "A Lunch",
			location: "Green Gym",
			coachEmail: "morgan.blake@example.com",
			description:
				"Power Lunch is a low commitment opportunity to learn the basics of Ultimate. No previous knowledge or experience is needed to join. Bring a friend and join us whenever you have time!",
		},
	},
];

export const fundraiserCampaign = {
	title: "2026 Lindbergh Ultimate Program Fundraiser",
	description:
		"Help offset program costs and support Lindbergh Ultimate student athletes throughout the season.",
	story:
		"Lindbergh High School Ultimate Frisbee team is raising money to help offset program costs and to support the members throughout the season. With the help of your generous donation, we'll also be able to purchase a video camera to film practices/games and provide student athlete sponsorships.",
	goalAmount: 2000,
	startDate: "2026-01-15T06:00:00.000Z",
	endDate: "2026-10-01T05:00:00.000Z",
	status: "ended",
	isFeatured: true,
	beneficiary: "Lindbergh Ultimate",
	donationUrl: "#",
};

export const demoPlayers = [
	{
		firstName: "Player",
		lastName: "One",
		grade: "11th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "L",
		status: "active",
		positions: ["handler"],
	},
	{
		firstName: "Player",
		lastName: "Two",
		grade: "10th",
		school: "Lindbergh High School",
		division: "Gxrls",
		shirtSize: "M",
		status: "active",
		positions: ["cutter"],
	},
	{
		firstName: "Player",
		lastName: "Three",
		grade: "9th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "M",
		status: "active",
		positions: ["hybrid"],
	},
];

export const demoDonations = [
	{ donorName: "Supporter One", amount: 500, playerIndex: 0, transactionId: "seed-donation-1" },
	{ donorName: "Supporter Two", amount: 400, playerIndex: 1, transactionId: "seed-donation-2" },
	{ donorName: "Supporter Three", amount: 300, playerIndex: 2, transactionId: "seed-donation-3" },
	{ donorName: "Supporter Four", amount: 250, playerIndex: 0, transactionId: "seed-donation-4" },
	{ donorName: "Supporter Five", amount: 200, playerIndex: 1, transactionId: "seed-donation-5" },
	{ donorName: "Supporter Six", amount: 150, playerIndex: 2, transactionId: "seed-donation-6" },
	{ donorName: "Supporter Seven", amount: 126, playerIndex: 0, transactionId: "seed-donation-7" },
	{ donorName: "Anonymous", amount: 100, playerIndex: null, isAnonymous: true, transactionId: "seed-donation-8" },
];

export const externalEvents = [
	{
		title: "League: Indoor Winter",
		type: "game",
		program: "community",
		division: "general",
		startAt: "2026-02-13T20:30:00-06:00",
		endAt: "2026-02-13T22:00:00-06:00",
		location: { name: "1 Athletic Dr", address: "1 Athletic Dr, Earth City, MO 63045" },
	},
	{
		title: "Pickup: Sundays @ Parkway Central",
		type: "other",
		program: "community",
		division: "general",
		startAt: "2026-02-15T12:30:00-06:00",
		endAt: "2026-02-15T14:30:00-06:00",
		location: {
			name: "Parkway Central High School",
			address: "369 N Woods Mill Rd, Chesterfield, MO 63017",
		},
	},
	{
		title: "League: Indoor Winter",
		type: "game",
		program: "community",
		division: "general",
		startAt: "2026-02-20T20:30:00-06:00",
		endAt: "2026-02-20T22:00:00-06:00",
		location: { name: "1 Athletic Dr", address: "1 Athletic Dr, Earth City, MO 63045" },
	},
	{
		title: "Pickup: Sundays @ Parkway Central",
		type: "other",
		program: "community",
		division: "general",
		startAt: "2026-02-22T12:30:00-06:00",
		endAt: "2026-02-22T14:30:00-06:00",
		location: {
			name: "Parkway Central High School",
			address: "369 N Woods Mill Rd, Chesterfield, MO 63017",
		},
	},
	{
		title: "League: Indoor Winter",
		type: "game",
		program: "community",
		division: "general",
		startAt: "2026-02-27T20:30:00-06:00",
		endAt: "2026-02-27T22:00:00-06:00",
		location: { name: "1 Athletic Dr", address: "1 Athletic Dr, Earth City, MO 63045" },
	},
	{
		title: "Pickup: Sundays @ Parkway Central",
		type: "other",
		program: "community",
		division: "general",
		startAt: "2026-03-01T12:30:00-06:00",
		endAt: "2026-03-01T14:30:00-06:00",
		location: {
			name: "Parkway Central High School",
			address: "369 N Woods Mill Rd, Chesterfield, MO 63017",
		},
	},
	{
		title: "Pickup: St. Charles",
		type: "other",
		program: "community",
		division: "general",
		startAt: "2026-03-02T18:00:00-06:00",
		endAt: "2026-03-02T19:45:00-06:00",
		location: { name: "Wapelhorst Park", address: "1875 Muegge Rd, St Charles, MO 63303" },
	},
];
