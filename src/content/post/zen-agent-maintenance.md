---
title: 'Zen and the Art of Agent Maintenance'
description: 'Agent maintenance is not overhead: it is the practice of making automation inspectable, deliberate, and accountable to the life it serves.'
author: Edmund Miller
publishDate: 2026-07-24
tags: ['ai', 'agents', 'automation', 'craftsmanship']
draft: true
---

I have started treating Codex less like a destination and more like a staging ground.

It is where I can move quickly: specify a piece of business logic, try an automation, inspect the result the next day, and decide whether it is worth keeping. Claude and Cursor can play a similar role. They are managed environments in which an idea can become concrete before I am certain that it deserves a permanent home.

The important word is *temporary*. I do not want to accumulate chats or background tasks. I want to discover behavior that survives ordinary life. When one does—when it keeps solving a real problem, has understandable inputs and outputs, and repays the attention required to run it—I want to move it into a system I maintain: perhaps [Flue](https://flueframework.com/) or [Eve](https://eve.dev/docs/introduction) for an explicit workflow—the [Eve workshop](https://www.youtube.com/watch?v=eD8pV7nSIxY) is a useful introduction—perhaps Hermes or OpenClaw for an agent.

That sounds backward. The usual promise of agents is that they eliminate maintenance. You tell a capable system what you want, it acts, and you get your time back. Why voluntarily graduate from a polished managed product into the work of owning prompts, tools, schedules, permissions, state, logs, and failures?

Because the maintenance is not incidental to the value. It is where I find out what the agent is actually doing.

## The defaults hiding inside a managed agent

Managed agents are useful precisely because they make progress easy. They provide a model, an interface, a tool surface, and a set of defaults that are sensible often enough to get started. That is a gift at the beginning of a project.

But every default is also a decision somebody else has made about how work should proceed. How much context should the agent see? Which tools should it reach for? When should it interrupt? What may it change without asking? Which failure is recoverable? What counts as success?

In a managed session, those answers can stay pleasantly invisible until they matter. A result may look correct while relying on stale context. A helpful action may arrive after the moment when it was useful. An agent may carry out the wrong plan faithfully because the underlying assumption was never visible enough to challenge.

This is not an argument that managed agents are bad, nor that every task deserves a self-hosted replacement. It is an argument against confusing convenience with understanding.

I want managed systems in the early part of the lifecycle. I want a place to think in public with a model, turn vague intentions into specifications, and throw away weak ideas cheaply. But a behavior that becomes durable—something that touches a household, a knowledge base, a recurring work practice, or another person’s time—should not remain a mysterious convenience just because it began that way.

It should become inspectable.

## Graduation is a test, not a promotion

I do not think of this as a hierarchy in which an owned agent is inherently superior to a managed one. It is a lifecycle.

A managed agent is often the right place to ask: *What would this workflow even be?* I can use Codex, Claude, or Cursor to write down the rules, sketch the tool calls, and test whether the task is coherent. I think of that as writing business-rules notes: ordinary decisions about groceries, reminders, research, finances, and a home-assistant-like system of preferences and constraints.

That first version should be cheap to revise. It is still a hypothesis.

The systems I maintain more directly have a different job. Flue and [Eve](https://eve.dev/docs/extensions) make it natural to put an agent’s instructions, workflows, and evaluation surface in files I can read. Hermes and OpenClaw make a personal or broad agent feel less like a one-off conversation and more like an environment with an identity, tools, and boundaries. The products are different; the useful distinction is not their branding. It is whether I can make the behavior legible enough to own.

Harrison Chase describes the same boundary as [owning your intelligence](https://x.com/hwchase17/status/2081002647814094888): controlling the agent system, its economics, quality, risk, and the feedback loop that improves it.

A workflow earns graduation when I can answer basic questions without hand-waving:

- What triggers it, and why then?
- Which information may it use?
- What action may it take on its own?
- What evidence will show me that it worked?
- How will I notice when its assumptions have gone stale?

If I cannot answer those, the workflow is not ready for durable automation. It belongs back in the staging ground.

This is where agent building resembles a practice that software culture sometimes treats as beneath invention: maintenance. The glamorous moment is the first successful run. The consequential moments come later—after a provider changes behavior, a source moves, a permission turns out to be too broad, or a seemingly harmless notification becomes noise. The system either teaches me something about the situation it was meant to serve, or it silently drifts away from it.

## Pirsig’s lesson is attention

*Zen and the Art of Motorcycle Maintenance* is useful here, but not because an agent is literally a motorcycle. Pirsig gives a way to think about the relationship between technical competence and lived experience.

The classical view of an agent is easy to recognize: prompts, schemas, permissions, retries, durable state, logs, evals, and tests. I want all of that. An agent that cannot show its work, tolerate a restart, or distinguish a fact from a guess is not trustworthy merely because it is charming.

But the romantic view is equally necessary. Does the daily briefing orient me, or merely add another thing to read? Does an inbox agent help me recognize commitments and themes, or only produce a cleaner inbox? Does a household automation remove friction, or does it turn a conversation into an optimization problem?

Technical correctness is not the same as quality. A system can execute every step correctly and still act at the wrong time, optimize the wrong proxy, or make life feel more surveilled and brittle. Conversely, a warm and magical interface can conceal uncertainty and encourage trust it has not earned.

The craft is the fit between the machinery and the life around it.

That fit cannot be specified once and forgotten. It has to be observed, diagnosed, adjusted, and verified. I need to look at what the agent did, compare it with what mattered, change the rule or the boundary that produced the mismatch, and then see whether the correction actually holds. This is not overhead around the real automation. It is the real automation becoming accountable to reality.

## The trap on the other side

There is an obvious failure mode in this philosophy: building can become avoidance.

A self-maintained agent can be a beautiful machine that never improves anything important. It is easy to keep adding tools, models, abstractions, dashboards, and clever orchestration because each improvement feels like progress. But a well-tuned system that solves an invented problem is still a distraction. Ownership does not sanctify a workflow.

That is why I do not want to begin by building infrastructure. The managed staging ground is a safeguard against that impulse. It lets me test the value of a behavior before I commit to its machinery. A workflow should graduate because it has earned maintenance, not because I am eager to maintain it.

The question is not: *Can this become an agent?*

It is: *What human capacity will this protect or improve, and is an agent the smallest honest way to do it?*

Sometimes the correct answer is a reminder, a checklist, a script, or a conversation. Sometimes a managed chat is enough. Sometimes the enduring value lies in making the workflow explicit and owning its operation. The point is to preserve that judgment rather than bury it inside the most autonomous-looking system available.

## The real agent under maintenance

When I maintain an agent, I am maintaining more than its code.

I am deciding what deserves my attention, what can happen without me, where another person should remain in the loop, and which kinds of evidence I need before I trust a result. A schedule encodes a belief about when interruption is warranted. A permission boundary encodes a belief about responsibility. An evaluation encodes a belief about what good looks like.

That is why I do not want agents that simply remove me from the process. I want agents that remove needless reconstruction, repeated lookup, and mechanical follow-through while leaving me more able to see the decisions that remain.

The best agent is not the one that feels finished. It is the one whose maintenance keeps bringing me back into contact with the reality it serves.

In Pirsig’s terms, the machine is never the whole subject. The work is also on the person who chooses what to notice and what to care for. The same is true of the agents I am building. Their prompts, tools, and workflows matter. But the deeper practice is learning to shape technology with enough attention that it makes my life more conscious, rather than merely more automatic.
