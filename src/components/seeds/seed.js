const intakeNotes = [
  { id: 1, text: 'Primary Code', path: '/' },
  { id: 2, text: 'Person Present', path: '/' },
  { id: 3, text: 'Chief Complaint', path: '/' },
  { id: 4, text: 'History of Present Illess', path: '/' },
  { id: 5, text: 'Stressors', path: '/' },
  { id: 6, text: 'Review of Systems', path: '/review-of-systems' },
  { id: 7, text: 'Substance Abuse History', path: '/' },
  { id: 8, text: 'Substance Abuse Treatment History', path: '/' },
  { id: 9, text: 'Substance Use Consequences', path: '/' },
  { id: 10, text: 'Inpatient Psychiatric History', path: '/' },
  { id: 11, text: 'Outpatient Psychiatric History', path: '/' },
  { id: 12, text: 'Suicide/Self Harm History', path: '/' },
  { id: 13, text: 'Violence History', path: '/' },
  { id: 14, text: 'Past Medical History', path: '/' },
  { id: 15, text: 'Psychiatric Medication History', path: '/' },
  { id: 16, text: 'Allergies', path: '/' },
  { id: 17, text: 'Medication', path: '/' },
  { id: 18, text: 'Family History', path: '/' }
]

const reviewOfSystems = [
  { id: 1, text: 'Constitutional' },
  { id: 2, text: 'Eyes' },
  { id: 3, text: 'Ears, Nose, Mouth & Throat' },
  { id: 4, text: 'Cardiovascular' },
  { id: 5, text: 'Respiratory' },
  { id: 6, text: 'Musculoskeletal' },
  { id: 7, text: 'Gastrointestinal' },
  { id: 8, text: 'Headache' },
  { id: 9, text: 'Stomach' },
  { id: 10, text: 'Skin issues' },
  { id: 11, text: 'Other' }
]

const systemTypes = [
  { id: 1, text: 'Chronic pain', systemId: 1 },
  { id: 2, text: 'Loss of appetite', systemId: 1 },
  { id: 3, text: 'Increase in appetite', systemId: 1 },
  { id: 4, text: 'Unexpected weight loss', systemId: 1 },
  { id: 5, text: 'Weight gain', systemId: 1 },
  { id: 6, text: 'Fatigue/Lethargy', systemId: 1 },
  { id: 7, text: 'Unexplained fever', systemId: 1 },
  { id: 8, text: 'Hot or cold speils', systemId: 1 },
  { id: 9, text: 'Night sweats', systemId: 1 },
  { id: 10, text: 'Sleeping pattern disruption', systemId: 1 },
  { id: 11, text: 'Malaise (FluOLike Or Vague Sick Feeling', systemId: 1 },
  { id: 12, text: 'None of the above constitutional issues', systemId: 1 },
  { id: 13, text: 'Loose of vision', systemId: 2 },
  { id: 14, text: 'Eyes Blur', systemId: 2 },
  { id: 15, text: 'Itchy', systemId: 2 },
  { id: 16, text: 'Red Eyes', systemId: 2 },
  { id: 17, text: 'Unable To See', systemId: 2 },
]

const macros = [
  { id: 1, text: 'Take a nap' },
  { id: 2, text: 'Go hiking' },
  { id: 3, text: 'Do something' },
  { id: 4, text: 'Sleeping' },
]

function findSystemTypesById (sysId) {
  return systemTypes.filter(type => type.systemId === sysId)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  intakeNotes,
  reviewOfSystems,
  macros,
  findSystemTypesById
}
