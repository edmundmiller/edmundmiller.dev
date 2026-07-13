---
title: Creating Rough Drafts with Whisper
description: A local speech-to-text workflow for turning a spoken outline into editable prose.
publishDate: 2024-04-17
tags: ['writing', 'AI']
draft: true
---

Starting a draft is harder for me than revising one. A blank page makes every sentence feel final before I have settled the idea.

Speaking changes that constraint. I can explain an idea in fragments, repeat myself, and discover the useful sentence later. Whisper can turn that recording into text I can edit.

[A post from Laurie Voss](https://x.com/seldo/status/1790481110377628044) prompted this note. I wanted to test the idea with a local tool instead of sending an unpublished recording to a service.

## Record an outline, not a finished post

The recording only needs to answer four questions:

1. What problem started the post?
2. What did I try?
3. What concrete example explains it?
4. What result changed my view?

I would answer each question once without correcting sentences. The goal is raw material, not publishable dictation.

Short recordings also make mistakes easier to find. Names, commands, links, and numbers still need to be checked against their sources.

## Transcribe locally with whisper.cpp

An archived journal entry from October 2023 records my first local batch workflow. It used Nix to provide whisper.cpp and downloaded the English `medium.en` model.

The command converted every OGG recording to mono 16 kHz audio. It then streamed that audio into Whisper and requested text output.

```sh
nix shell nixpkgs#whisper-cpp
whisper-cpp-download-ggml-model medium.en

for file in *.ogg; do
  ffmpeg -nostdin -threads 0 -i "$file" \
    -f wav -ac 1 -acodec pcm_s16le -ar 16000 - \
    | whisper-cpp -m ggml-medium.en.bin -f - -otxt
done
```

That note preserves the model, audio conversion, and batch command. It does not preserve the generated transcripts.

The current whisper.cpp command is named `whisper-cli`. For one recording, the equivalent file-based workflow is easier to inspect:

```sh
ffmpeg -i draft.ogg -ar 16000 -ac 1 -c:a pcm_s16le draft.wav
whisper-cli \
  -m ggml-medium.en.bin \
  -f draft.wav \
  -otxt -of draft -nt
```

This writes the transcript to `draft.txt`. Keeping the recording beside that file makes transcription errors easier to review.

## Turn the transcript into a draft

I would edit in three passes. First, delete filler and repeated ideas. Next, arrange the remaining claims in a useful order. Finally, verify details and rewrite each sentence.

Whisper should not make editorial decisions in this workflow. It only removes the need to type the first version. The transcript remains an input to writing.

Local transcription also keeps the unpublished recording on my machine. That boundary matters when the draft contains personal or confidential material.

## What the evidence supports

The archived command shows that I had a local path from OGG recordings to text. A cached Whisper model also remains on this machine.

I do not have an archived transcript, timing measurement, or finished post tied to that experiment. I therefore cannot claim that speaking produced a faster or better draft.

Before publishing this post, I need one recorded example. It must preserve the audio, raw transcript, edited draft, and elapsed time. I also need notes about corrections and deleted repetition.

That test can answer the useful question. Does transcription reduce the friction of starting while leaving less revision work than an ordinary rough draft?

## References

- [whisper.cpp](https://github.com/ggml-org/whisper.cpp)
- [Laurie Voss's original prompt](https://x.com/seldo/status/1790481110377628044)
