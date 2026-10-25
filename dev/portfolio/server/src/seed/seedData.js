export const coaches = [
	{
		firstName: "Gabby",
		lastName: "Lavezzi",
		title: "Boys Ultimate Coach",
		role: "head_coach",
		email: "gabriellalavezzi@lindberghschools.ws",
		program: "high-school",
		division: "Boys",
		displayOrder: 1,
		photoUrl: "https://i.pravatar.cc/400?u=gabby",
		bio: "Coach Gabby leads the Lindbergh High School boys program and hosts Power Lunch.",
	},
	{
		firstName: "Kristina",
		lastName: "Gu",
		preferredName: "T",
		title: "Gxrls Team Coach",
		role: "head_coach",
		email: "kristinagu@lindberghschools.ws",
		program: "high-school",
		division: "Gxrls",
		isBoosterContact: true,
		displayOrder: 2,
		photoUrl: "https://i.pravatar.cc/400?u=kristina",
		bio: "Coach T leads the Gxrls program and was named Coach of the Year in 2023.",
	},
	{
		firstName: "Loren",
		lastName: "Goodrich",
		preferredName: "Goods",
		title: "Boys Team Coach",
		role: "assistant_coach",
		email: "goodric3@gmail.com",
		program: "high-school",
		division: "Boys",
		displayOrder: 3,
		photoUrl: "https://i.pravatar.cc/400?u=loren",
	},
	{
		firstName: "Joe",
		lastName: "Corcoran",
		title: "Gxrls Team Coach",
		role: "assistant_coach",
		email: "serioustob@gmail.com",
		program: "high-school",
		division: "Gxrls",
		isBoosterContact: true,
		displayOrder: 4,
		photoUrl: "https://i.pravatar.cc/400?u=joe",
	},
];

export const boosterMembers = [
	{
		name: "Joe Corcoran",
		role: "President",
		roleKey: "president",
		email: "serioustob@gmail.com",
		displayOrder: 1,
	},
	{
		name: "Traci Lichtenberg",
		role: "Secretary",
		roleKey: "secretary",
		email: "tlich1126@gmail.com",
		displayOrder: 2,
	},
	{
		name: "Chris Dollenmeyer",
		role: "Co-Treasurer",
		roleKey: "treasurer",
		email: "Christopherlee711@yahoo.com",
		displayOrder: 3,
	},
	{
		name: "Dave Valentine-Elam",
		role: "Co-Treasurer",
		roleKey: "treasurer",
		email: "dvalentineelam@gmail.com",
		displayOrder: 4,
	},
	{
		name: "Terry Biesboer",
		role: "Vice-President",
		roleKey: "vice_president",
		email: "tbiesboer@gmail.com",
		displayOrder: 5,
	},
	{
		name: "Evie Reed",
		role: "Alumni Rep",
		roleKey: "alumni_rep",
		email: "18evelynreed@gmail.com",
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
		name: 'Kristina "T" Gu',
		role: "Gxrls Team Coach",
		roleKey: "coach",
		email: "kristinagu@lindberghschools.ws",
		displayOrder: 8,
	},
	{
		name: "Gabby Lavezzi",
		role: "Boys Team Coach",
		roleKey: "coach",
		email: "gabriellalavezzi@lindberghschools.ws",
		displayOrder: 9,
	},
	{
		name: "Loren Goodrich",
		role: "Boys Team Coach",
		roleKey: "coach",
		email: "goodric3@gmail.com",
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
		authorName: "Teresa Dollenmeyer",
		authorType: "player",
		attribution: "Teresa Dollenmeyer (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 1,
	},
	{
		quote:
			"Playing ultimate has shaped me into the leader I am today and has build my confidence both on and off the field. It opens you up to an incredibly supportive and kind community for all ages.",
		authorName: "Karen Bose",
		authorType: "player",
		attribution: "Karen Bose (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 2,
	},
	{
		quote:
			"Ultimate's unique Spirit of the Game has given our son a place to play hard and have fun! The positive attitudes of players, coaches, and spectators truly makes this sport exceptional.",
		authorName: "Traci Lichtenberg",
		authorType: "parent",
		attribution: "Traci Lichtenberg (Parent)",
		displayOrder: 3,
	},
	{
		quote:
			"As a parent, I couldn't be more impressed with the Lindbergh Flyers Ultimate Frisbee team. The coaching staff is outstanding—so knowledgeable about the sport and so dedicated to the players. I saw how they invested in my daughter not just as an athlete, but as a person—offering support in school, other interests, and personal growth. The team atmosphere is incredibly welcoming—every skill level is embraced, and it's just a joy to watch them grow both on and off the field. I'm so grateful for this amazing team!",
		authorName: "Kristie Deeter",
		authorType: "parent",
		attribution: "Kristie Deeter (Parent)",
		displayOrder: 4,
	},
	{
		quote:
			"Ultimate has given me a community and friends as well as really valuable leadership experience that I feel like I have learned a lot from. It's one the most welcoming sports out there, and a place where you can get some energy out in a really fun way!",
		authorName: "Abby Deeter",
		authorType: "player",
		attribution: "Abby Deeter (Player, c.o. 2025)",
		graduationYear: 2025,
		displayOrder: 5,
	},
	{
		quote:
			"It's a low-risk sport compared to the ones at the high school that's not as popular but it's just as fun that can help you build athleticism whether you're getting into sports or on an off season of another sport.",
		authorName: "Ivanka Huynh",
		authorType: "player",
		attribution: "Ivanka Huynh (Player, c.o. '25)",
		graduationYear: 2025,
		displayOrder: 6,
	},
	{
		quote:
			"Ultimate has helped my son build confidence, learn teamwork and is a fun outlet for his competitive spirit!",
		authorName: "Monica Queathem",
		authorType: "parent",
		attribution: "Monica Queathem (Parent)",
		displayOrder: 7,
	},
	{
		quote:
			"Ultimate gave my son a great way to stay active, introduced him to a new sport, and helped him make new friends.",
		authorName: "Carrie Love",
		authorType: "parent",
		attribution: "Carrie Love (Parent)",
		displayOrder: 8,
	},
	{
		quote:
			"We've enjoyed the ultimate frisbee program at Truman. It's well organized, and the coaches are accepting of all skill levels, so it helps the kids build confidence while having fun.",
		authorName: "Trevor MacDougall",
		authorType: "parent",
		attribution: "Trevor MacDougall (Parent)",
		displayOrder: 9,
	},
	{
		quote: "Ultimate has been a very positive experience for my son's physical and social health.",
		authorName: "Rachel Charney",
		authorType: "parent",
		attribution: "Rachel Charney (Parent)",
		displayOrder: 10,
	},
	{
		quote:
			"The team camaraderie is incredible! As a first time player, my daughter felt a part of the team from day one! Thank you Coach T, I know you have created this wonderful atmosphere! It's so easy to play hard when you're having so much fun!!!",
		authorName: "Karen Penrod",
		authorType: "parent",
		attribution: "Karen Penrod (Parent)",
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
		title: "Coach of the Year Recipient - Kristina 'T' Gu",
		recipients: ["Kristina Gu"],
		years: [2023],
		displayOrder: 1,
	},
	{ category: "coaches", title: "All", years: [2023], displayOrder: 2 },
	{
		category: "players",
		title: "Maggie O'Brien - Heart of the Lyons Recipient",
		recipients: ["Maggie O'Brien"],
		years: [2019],
		displayOrder: 1,
	},
	{
		category: "players",
		title: "Abby Deeter - Heart of the Lyons Recipient",
		recipients: ["Abby Deeter"],
		years: [2024],
		displayOrder: 2,
	},
	{
		category: "players",
		title: "Karen Bose - Heart of the Lyons Recipient",
		recipients: ["Karen Bose"],
		years: [2025],
		displayOrder: 3,
	},
	{ category: "players", title: "All", years: [2019, 2024, 2025], displayOrder: 4 },
];

export const galleries = [
	{
		title: "Middle School",
		coverImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
		year: 2025,
		program: "middle-school",
		externalUrl: "#",
		displayOrder: 1,
	},
	{
		title: "All Star Game 2025",
		coverImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
		year: 2025,
		externalUrl: "#",
		displayOrder: 2,
	},
	{
		title: "High School Spring Season 2025",
		coverImageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
		year: 2025,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 3,
	},
	{
		title: "High School Spring Season 2024",
		coverImageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
		year: 2024,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 4,
	},
	{
		title: "High School Spring Season 2023",
		coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
		year: 2023,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 5,
	},
	{
		title: "Gxrls Missouri State Tournament 2023",
		coverImageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80",
		year: 2023,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 6,
	},
	{
		title: "High School Spring Season 2022",
		coverImageUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
		year: 2022,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 7,
	},
	{
		title: "High School Gxrls Spring Season 2021 / High School Boys Spring Season 2021",
		coverImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
		year: 2021,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 8,
	},
	{
		title: "High School Gxrls Pre-2020",
		note: "Photos from the one game in 2020 before the world shut down",
		coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
		year: 2020,
		program: "high-school",
		externalUrl: "#",
		displayOrder: 9,
	},
];

export const mediaItems = [
	{
		title: "Girls State Championships 2021 Highlight Reel",
		type: "video",
		year: 2021,
		displayOrder: 1,
	},
	{
		title: "Flyers News Broadcast 3/6/25 Ultimate Segment",
		type: "video",
		year: 2025,
		duration: "3:15",
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
		value: "lindberghultimate@gmail.com",
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
		value: "AZJQ-PPDT",
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
		value: "#",
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
			coachEmail: "gabriellalavezzi@lindberghschools.ws",
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
