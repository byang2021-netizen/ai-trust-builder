const scenarios = [

    {
        id: 1,

        title: "Building Trust Before Introducing AI",
        theme: {

            icon: "👂",

            stage: "Listen First"

        },

        faculty: {
            name: "Dr. Taylor",
            role: "Faculty Member"
        },

        message:
        "I am concerned about AI. I worry students may use it instead of learning.",


        choices: [

            {

                text:
                "Tell me more about your concerns.",

                trust: 10,

                feedbackTitle:
                "Strong Trust-Building Response",

                feedback:
                "You started by listening instead of immediately offering a solution. This shows respect for the faculty member's expertise and creates space for collaboration."

            },


            {

                text:
                "AI can help students learn more efficiently.",

                trust: 2,

                feedbackTitle:
                "Opportunity to Improve",

                feedback:
                "You shared a possible benefit of AI, but you moved toward a solution before fully understanding the faculty member's concern."

            },


            {

                text:
                "Everyone is using AI now, so we need to adapt.",

                trust: -5,

                feedbackTitle:
                "Trust May Decrease",

                feedback:
                "This response may unintentionally dismiss the faculty member's concern. Trust develops when people feel heard and respected."

            }

        ]

    },





    {
        id: 2,

        title: "AI as a Partner, Not a Replacement",
        theme: {

             icon: "🤝",

            stage: "Build Partnership"

        },

        faculty: {

            name: "Dr. Martinez",

            role: "Faculty Member"

        },


        message:

        "Could AI just create my entire online course? It seems like it would save everyone a lot of time.",



        choices: [

            {

                text:
                "Yes, AI can create most of the course materials for you.",

                trust: -5,

                feedbackTitle:
                "Trust May Decrease",

                feedback:
                "This response may unintentionally reduce the value of faculty expertise and the instructional design partnership."

            },

            {

                text:
                "AI can help with some tasks, but your expertise shapes the course goals and learning experience.",

                trust: 10,

                feedbackTitle:
                "Strong Partnership Response",

                feedback:
                "You positioned AI as a support tool while recognizing the faculty member as the content expert."

            },

            {

                text:
                "Instructional designers usually handle course development.",

                trust: 0,

                feedbackTitle:
                "Opportunity to Improve",

                feedback:
                "This separates roles instead of building partnership. A stronger response would emphasize collaboration."

            }

        ]

    },





    {
        id: 3,

        title: "Respecting Faculty Concerns About AI",
        theme: {

            icon: "💬",

            stage: "Navigate Concerns"

        },

        faculty: {

            name: "Professor Lee",

            role: "Faculty Member"

        },


        message:

        "I don't want AI anywhere in my course. I don't think it belongs in education.",



        choices: [

            {

                text:
                "I understand your concern. Can we talk about what worries you most?",

                trust: 10,

                feedbackTitle:
                "Strong Trust-Building Response",

                feedback:
                "You respected the faculty member's perspective and opened a conversation instead of pushing a solution."

            },

            {

                text:
                "AI is becoming unavoidable, so we need to accept it.",

                trust: -5,

                feedbackTitle:
                "Trust May Decrease",

                feedback:
                "This response may feel dismissive because it does not acknowledge the faculty member's values or concerns."

            },

            {

                text:
                "Let me show you some AI tools that could help your course.",

                trust: 2,

                feedbackTitle:
                "Opportunity to Improve",

                feedback:
                "Sharing examples can be useful, but first understanding the faculty member's perspective will build stronger trust."

            }

        ]

    }

];