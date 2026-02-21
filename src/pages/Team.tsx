import { useEffect, useState } from 'react';
// import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function Team() {
  const [teamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
    //   const response = await fetch(
    //     `https://${projectId}.supabase.co/functions/v1/make-server-38b44ff9/team`,
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${publicAnonKey}`
    //       }
    //     }
    //   );
    //   const data = await response.json();
    //   setTeamMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample team members if none exist
  const sampleTeam = [
    {
      id: '1',
      name: 'Lahiru Srimal',
      role: 'Lead Architect & Designer',
      expertise: 'Specialized in residential and commercial architecture with over 10 years of experience in creating innovative designs.',
      photoUrl: 'https://images.unsplash.com/photo-1583824159840-b85725a711b4?w=400',
      email: 'Lahiru.cadstoral@gmail.com',
      phone: '0761 380 569'
    },
    {
      id: '2',
      name: 'Project Manager',
      role: 'Construction Manager',
      expertise: 'Expert in project management, coordination, and ensuring timely delivery of construction projects.',
      photoUrl: 'https://images.unsplash.com/photo-1583824159840-b85725a711b4?w=400'
    },
    {
      id: '3',
      name: 'Structural Engineer',
      role: 'Senior Engineer',
      expertise: 'Specializing in structural design, load calculations, and ensuring building safety compliance.',
      photoUrl: 'https://images.unsplash.com/photo-1583824159840-b85725a711b4?w=400'
    }
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : sampleTeam;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url('https://images.unsplash.com/photo-1583824159840-b85725a711b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjB0ZWFtfGVufDF8fHx8MTc3MTQwNjEyNXww&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-4">Our Group</h1>
          <p className="text-xl text-gray-200 mb-4">
            Meet the talented professionals behind our success
          </p>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Our Professional Team</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team consists of experienced architects, engineers, and construction professionals 
            dedicated to delivering excellence in every project. With diverse expertise and a shared 
            commitment to quality, we collaborate to transform your architectural visions into reality. 
            Each team member brings unique skills and creativity, ensuring comprehensive solutions 
            from initial design through final construction.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTeam.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition group"
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={member.photoUrl || 'https://images.unsplash.com/photo-1583824159840-b85725a711b4?w=400'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-accent font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.expertise}</p>

                    {/* Contact Icons */}
                    {(member.email || member.phone || member.linkedin) && (
                      <div className="flex space-x-3 pt-4 border-t">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Join Our Team?</h2>
          <p className="text-xl mb-8">
            We're always looking for talented professionals to join our growing team. 
            If you're passionate about architecture and design, we'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-md font-semibold hover:bg-accent/90 transition text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};
