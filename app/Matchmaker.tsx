import { useState } from "react";
import { Alert, Dimensions, Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from "react-native";


const windowWidth = Dimensions.get('window').width;
const scaleFactor = windowWidth / 411;

type Skill = {
  
  name: string;
  expLevel: number;
  active: boolean;
  icon?: ImageSourcePropType;
}

type Person = {
  id: string,
  name: string,
  experiences: Skill[],
  goal: string,
  interests: string,
  status: number
}

const SKILL_ICONS = {
  Frontend: require("../assets/skillIcons/frontend.png"),
  Backend: require("../assets/skillIcons/backend.png"),
  "Mobile Dev": require("../assets/skillIcons/mobiledev.png"),
  "Cloud / DevOps": require("../assets/skillIcons/cloud.png"),
  "AI / ML": require("../assets/skillIcons/ai.png"),
  Design: require("../assets/skillIcons/design.png"),
  Pitching: require("../assets/skillIcons/pitching.png"),
  "Project Management": require("../assets/skillIcons/projectManagement.png"),
}

const experienceText = {
  "1": "Just Learned",
  "2": "Low Experience",
  "3": "Experienced",
  "4": "Highly Experienced",
  "5": "Master"
}


const TESTHACKERS: Person[] = [
  {
    id: "001", 
    name: "Alex Chen",
    experiences: [
      { name: "Frontend", expLevel: 5, active: true, icon: SKILL_ICONS.Frontend },
      { name: "Design", expLevel: 4, active: true, icon: SKILL_ICONS.Design },
      { name: "Backend", expLevel: 3, active: true, icon: SKILL_ICONS.Backend },
    ],
    goal: "Build a polished hackathon project and win a prize",
    interests: "UI/UX, startups, consumer apps",
    status: 1,
  },
  {
    id: "002", 
    name: "Maya Patel",
    experiences: [
      { name: "Backend", expLevel: 4, active: true, icon: SKILL_ICONS.Backend },
      { name: "Cloud / DevOps", expLevel: 3, active: true, icon: SKILL_ICONS["Cloud / DevOps"] },
      { name: "Frontend", expLevel: 1, active: true, icon: SKILL_ICONS.Frontend },
    ],
    goal: "Learn system design and ship something scalable",
    interests: "Infrastructure, cloud, performance",
    status: 1,
  },
  {
    id: "003", 
    name: "Jordan Smith",
    experiences: [
      { name: "AI / ML", expLevel: 3, active: true, icon: SKILL_ICONS["AI / ML"] },
      { name: "Backend", expLevel: 2, active: true, icon: SKILL_ICONS.Backend },
      { name: "Cloud / DevOps", expLevel: 1, active: true, icon: SKILL_ICONS["Cloud / DevOps"] },
    ],
    goal: "Apply machine learning to a real-world problem",
    interests: "AI, data, research",
    status: 1,
  },
  {
    id: "004", 
    name: "Emily Wong",
    experiences: [
      { name: "Pitching", expLevel: 4, active: true, icon: SKILL_ICONS.Pitching },
      { name: "Project Management", expLevel: 3, active: true, icon: SKILL_ICONS["Project Management"] },
      { name: "Design", expLevel: 2, active: true, icon: SKILL_ICONS.Design },
    ],
    goal: "Help a team stay organized and deliver a strong pitch",
    interests: "Leadership, startups, storytelling",
    status: 1,
  },
  {
    id: "005", 
    name: "Lucas Martin",
    experiences: [
      { name: "Mobile Dev", expLevel: 4, active: true, icon: SKILL_ICONS["Mobile Dev"] },
      { name: "Frontend", expLevel: 3, active: true, icon: SKILL_ICONS.Frontend },
      { name: "Backend", expLevel: 1, active: true, icon: SKILL_ICONS.Backend },
    ],
    goal: "Build a mobile-first app from scratch",
    interests: "Mobile UX, app design",
    status: 1,
  },
  {
    id: "006", 
    name: "Sarah Johnson",
    experiences: [
      { name: "Backend", expLevel: 2, active: true, icon: SKILL_ICONS.Backend },
      { name: "Cloud / DevOps", expLevel: 2, active: true, icon: SKILL_ICONS["Cloud / DevOps"] },
    ],
    goal: "Improve backend skills and learn from teammates",
    interests: "Learning, collaboration",
    status: 1,
  },
  {
    id: "007", 
    name: "Noah Kim",
    experiences: [
      { name: "Design", expLevel: 4, active: true, icon: SKILL_ICONS.Design },
      { name: "Frontend", expLevel: 2, active: true, icon: SKILL_ICONS.Frontend },
    ],
    goal: "Create something visually unique",
    interests: "Creative coding, visuals",
    status: 1,
  },
  {
    id: "008", 
    name: "Ava Rodriguez",
    experiences: [
      { name: "Frontend", expLevel: 2, active: true, icon: SKILL_ICONS.Frontend },
      { name: "Backend", expLevel: 1, active: true, icon: SKILL_ICONS.Backend },
      { name: "AI / ML", expLevel: 1, active: true, icon: SKILL_ICONS["AI / ML"] },
    ],
    goal: "Learn how hackathons work and gain experience",
    interests: "Learning, teamwork",
    status: 1,
  },
  {
    id: "009", 
    name: "Ethan Brown",
    experiences: [
      { name: "Cloud / DevOps", expLevel: 5, active: true, icon: SKILL_ICONS["Cloud / DevOps"] },
      { name: "Backend", expLevel: 3, active: true, icon: SKILL_ICONS.Backend },
    ],
    goal: "Build something production-like",
    interests: "Infrastructure, automation",
    status: 1,
  },
  {
    id: "010", 
    name: "Zoe Nguyen",
    experiences: [
      { name: "Pitching", expLevel: 5, active: true, icon: SKILL_ICONS.Pitching },
      { name: "Project Management", expLevel: 4, active: true, icon: SKILL_ICONS["Project Management"] },
    ],
    goal: "Help teams communicate their ideas clearly",
    interests: "Presentations, leadership",
    status: 1,
  },
]

const maxTeammates = 4;

export default function SkillsScreen() {
    const [hackers, setHackers] = useState<Person[]>(TESTHACKERS);

    const sortedHackers = [...hackers].sort((a, b) => {
      if (a.status === 0 && b.status !== 0) return 1;
      if (a.status !== 0 && b.status === 0) return -1;
      return 0;
    });
  
    const choosePerson = (id: string) => {
      console.log(id)

      setHackers(prev =>
        prev.map(person => {
          if (person.id === id) {
            // Toggle teammate selection
            if (person.status === 2) {
              // Deselect
              return { ...person, status: 1 };
            } else if (prev.filter(h => h.status === 2).length < maxTeammates) {
              // Select if max not reached
              return { ...person, status: 2 };
            } else {
              // Max reached, ignore selection
              return person;
            }
          }

          // For all others, keep them as-is
          return person;
        })
      );
    };


    const showPicked = () => {

      const selected = hackers.filter(h => h.status === 2).map(h => h.name);

      // Build the message
      const message = 
        `Selected Teammates (${selected.length}/${maxTeammates}):\n` +
        selected.map(name => name).join("\n");
      Alert.alert("Team Summary", message)
    }

    return (
        <View
          style={{marginTop: 50}}
        >
          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
            <Text
              style={{
                  fontSize: Math.min(scaleFactor*30, 56),
                  fontWeight: "bold",
                  textAlign: "center",
                  lineHeight: 50, 
                  flex: 1
              }}>Other Hackers
            </Text>
            <Pressable 
              onPress={() => showPicked()}
              style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 15, marginLeft: "auto", marginRight: 20}}
            >
              <Text style={{textAlign: "center", fontWeight: "bold"}}>
                i
              </Text>
            </Pressable>
          </View>
            

            <ScrollView
            contentContainerStyle={{
              paddingBottom: 100, // 👈 IMPORTANT
            }}
            showsVerticalScrollIndicator={false}>
              {sortedHackers.map((person, index) => (
                <View
                  key={person.id}
                  style={{borderWidth: 3, margin: 20, padding: 15, flexDirection: "row", opacity: (person.status !== 0) ? 1 : 0.4}}
                >
                  <View style={{flex:1}}>
                    <Text style={{fontSize: 24}}>{person.name}</Text>
                    <Text style={{fontSize: 14}}>{person.goal}</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                      {person.experiences.map((skill, i) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 12,
                            marginBottom: 8,
                          }}
                        >
                          <Image
                            source={skill.icon}
                            style={{ width: 22, height: 22, marginRight: 6 }}
                          />
                          <Text style={{ fontSize: 12 }}>
                            {experienceText[skill.expLevel.toString() as keyof typeof experienceText] || "Unknown"}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <Text>Match %: --</Text>
                  </View>

                  {!(hackers.filter(h => h.status === 2).length == maxTeammates && person.status !== 2) && (
                    <View style={{ marginLeft: "auto", //opacity: (person.status === 1 || person.status === 2) ? 1 : 0 

                    }}>
                      
                      <Pressable
                          //style={{ width: 40, height: 40, backgroundColor: "#00ff00", opacity: 0.6, borderRadius: 10 }}
                          onPress={() => choosePerson(person.id)}
                          style={({ pressed }) => {
                            const isDisabled =
                              hackers.filter(h => h.status === 2).length >= maxTeammates && person.status !== 2;
                            return {
                              paddingHorizontal: 14,
                              paddingVertical: 10,
                              height: 40,
                              width: 40,
                              backgroundColor: "#00ff00",
                              borderRadius: 12,
                              opacity: isDisabled ? 0.2 : person.status === 2 ? 0.8 : 0.4,
                            };
                          }}
                          // disabled={hackers.filter(h => h.status === 2).map(h => h.name).length === maxTeammates}
                      >
                        <Text style={{ color: "black", fontWeight: "bold" }}>
                          {person.status === 2 ? "✓" : "+"}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={{height: 200}}></View>
        </View>
        
    )
}