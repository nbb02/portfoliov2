import { clamp01, easeInOutCubic, lerp } from "./easing"

/**
 * The phone opens with the approved back on show, turns to the screen, and only
 * then lets the camera start its dolly. The turn has to be finished before the
 * rig begins: the rig aims at the screen, and the screen normal is edge-on
 * halfway through the turn.
 */
export const PHONE_SPIN_START = 0.04
export const PHONE_SPIN_END = 0.22
export const PHONE_DOLLY_END = 0.95

const BACK_FIT = 0.8

/** 0 = back to camera, 1 = screen to camera. */
export function phoneFront(progress: number) {
  return easeInOutCubic(
    clamp01((progress - PHONE_SPIN_START) / (PHONE_SPIN_END - PHONE_SPIN_START)),
  )
}

/** The camera's blend. It reaches exactly 1 at the existing handoff. */
export function phoneDollyProgress(progress: number) {
  return clamp01(
    (progress - PHONE_SPIN_END) / (PHONE_DOLLY_END - PHONE_SPIN_END),
  )
}

/** A slightly closer hero framing while the back is on show. */
export function phoneHeroScale(progress: number) {
  return lerp(
    BACK_FIT,
    1,
    easeInOutCubic(
      clamp01(
        (progress - PHONE_SPIN_START) / (PHONE_SPIN_END - PHONE_SPIN_START),
      ),
    ),
  )
}
