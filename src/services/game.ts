import pb from '@/lib/pocketbase/client'
import type { Case, Evidence, Suspect, Testimony, ActivityLog } from '@/types/game'
import {
  mockCases,
  mockEvidence,
  mockSuspects,
  mockTestimonies,
  mockActivity,
} from '@/data/mock-data'

export async function getCases(): Promise<Case[]> {
  try {
    return (await pb.collection('cases').getFullList({ sort: '-created' })) as unknown as Case[]
  } catch {
    return mockCases
  }
}

export async function getEvidence(): Promise<Evidence[]> {
  try {
    return (await pb
      .collection('evidence')
      .getFullList({ sort: '-collected_at' })) as unknown as Evidence[]
  } catch {
    return mockEvidence
  }
}

export async function getSuspects(): Promise<Suspect[]> {
  try {
    return (await pb.collection('suspects').getFullList()) as unknown as Suspect[]
  } catch {
    return mockSuspects
  }
}

export async function getTestimonies(): Promise<Testimony[]> {
  try {
    return (await pb
      .collection('testimonies')
      .getFullList({ sort: '-recorded_at' })) as unknown as Testimony[]
  } catch {
    return mockTestimonies
  }
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  try {
    return (await pb
      .collection('activity_logs')
      .getFullList({ sort: '-created' })) as unknown as ActivityLog[]
  } catch {
    return mockActivity
  }
}
