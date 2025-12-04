import React from 'react'
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge"
type Detail = {
  title: string,
  desc: string,
  skills: string[]
}
interface ExperienceCardProps {
  company: string;
  role: string;
  dur: string;
  desc: string;
}
type Skill = {
  skills: string[]
}
export function Skills({ skills }: Skill) {
  return (
  <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="outline"
            className="border-border/50 bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}
export const Card = ({ title, desc, skills }: Detail) => {
  return (
     <div className="group relative w-full max-w-sm rounded-xl border border-border/50 bg-card/5 backdrop-blur-sm overflow-hidden mx-auto mt-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/10">
      {/* Gradient accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Skills skills={skills} />
        </div>
      </div>
    </div>

  )
}
export const ExperienceCard = ({ company, role, dur, desc }: ExperienceCardProps) => {
  return (
    <div className="group relative p-6 rounded-xl border border-border/50 bg-card/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/10">
      {/* Gradient accent line */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {role}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {company}
              </p>
            </div>
          </div>
          
          {/* Duration badge */}
          <span className="shrink-0 rounded-full border border-border/50 bg-muted/10 px-3 py-1 text-xs font-medium text-muted-foreground">
            {dur}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground/80 pl-[52px]">
          {desc}
        </p>
      </div>
    </div>
  );
};

