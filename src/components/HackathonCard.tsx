import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Hackathon } from '@/store/hackathonStore';
import { hackathonService } from '@/services/hackathonService';
import { MapPin, Calendar, Users, Trophy, ExternalLink, Globe } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface HackathonCardProps {
  hackathon: Hackathon;
  index?: number;
}

export default function HackathonCard({ hackathon, index = 0 }: HackathonCardProps) {
  const daysUntil = hackathonService.daysUntil(hackathon.startDate);
  const isHappeningSoon = hackathonService.isHappeningSoon(hackathon.startDate);
  const registrationPercentage = hackathon.participantLimit
    ? Math.round((hackathon.registeredCount || 0) / hackathon.participantLimit * 100)
    : 0;

  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-700 border-green-300',
    intermediate: 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
    advanced: 'bg-red-500/20 text-red-700 border-red-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-primary border border-gridline overflow-hidden hover:border-secondary transition-colors group"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-lavendergradientstart/30 to-lavendergradientend/30 overflow-hidden">
        {hackathon.image && (
          <Image src={hackathon.image} alt={hackathon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
        {isHappeningSoon && (
          <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-heading uppercase tracking-wider">
            Happening Soon!
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 text-xs font-heading uppercase tracking-wider border rounded ${difficultyColors[hackathon.difficulty]}`}>
            {hackathon.difficulty}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-full">
        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-heading text-primary-foreground uppercase mb-2 line-clamp-2">
            {hackathon.name}
          </h3>
          <p className="text-sm font-paragraph text-primary-foreground opacity-80 line-clamp-2">
            {hackathon.description}
          </p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gridline">
          {/* Date */}
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-heading text-primary-foreground opacity-60 uppercase">
                Dates
              </p>
              <p className="text-sm font-paragraph text-primary-foreground">
                {hackathonService.formatDate(hackathon.startDate)}
              </p>
              {daysUntil > 0 && (
                <p className="text-xs font-paragraph text-secondary mt-1">
                  {daysUntil} days away
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-heading text-primary-foreground opacity-60 uppercase">
                Location
              </p>
              <p className="text-sm font-paragraph text-primary-foreground">
                {hackathon.isVirtual ? 'Virtual' : hackathon.location}
              </p>
              {hackathon.isVirtual && (
                <Globe className="h-3 w-3 text-secondary mt-1" />
              )}
            </div>
          </div>

          {/* Prize Pool */}
          {hackathon.prizePool && (
            <div className="flex items-start gap-2">
              <Trophy className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-heading text-primary-foreground opacity-60 uppercase">
                  Prize Pool
                </p>
                <p className="text-sm font-paragraph text-primary-foreground">
                  {hackathon.prizePool}
                </p>
              </div>
            </div>
          )}

          {/* Participants */}
          {hackathon.participantLimit && (
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-heading text-primary-foreground opacity-60 uppercase">
                  Spots
                </p>
                <p className="text-sm font-paragraph text-primary-foreground">
                  {hackathon.registeredCount || 0}/{hackathon.participantLimit}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Registration Progress */}
        {hackathon.participantLimit && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-heading text-primary-foreground opacity-60 uppercase">
                Registration
              </p>
              <p className="text-xs font-paragraph text-primary-foreground opacity-80">
                {registrationPercentage}% full
              </p>
            </div>
            <div className="w-full h-2 bg-gridline rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${registrationPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-secondary"
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {hackathon.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-paragraph text-primary-foreground opacity-60 bg-background px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
          {hackathon.tags.length > 3 && (
            <span className="text-xs font-paragraph text-primary-foreground opacity-60 bg-background px-2 py-1 rounded">
              +{hackathon.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {hackathon.registrationUrl && (
            <Button
              onClick={() => window.open(hackathon.registrationUrl, '_blank')}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 font-paragraph uppercase text-sm tracking-wider"
            >
              Register
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
          {hackathon.websiteUrl && (
            <Button
              onClick={() => window.open(hackathon.websiteUrl, '_blank')}
              variant="outline"
              className="flex-1 border-gridline text-primary-foreground hover:bg-background h-10 font-paragraph uppercase text-sm tracking-wider"
            >
              Learn More
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
