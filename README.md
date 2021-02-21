<h1 align="center">Zoom Commander <img height="34" width="34" src="https://user-images.githubusercontent.com/4168389/80243995-80921700-8668-11ea-90ec-e19eb6c02c75.png"> <img height="30" width="30" src="https://user-images.githubusercontent.com/4168389/80243999-81c34400-8668-11ea-94b5-ad61ef3945b7.png"></h1>

<p align="center">
  【🇬🇧 🇪🇸 🇧🇷 🇫🇷】<a href="https://github.com/desko27/zoomcommander/readme/README.spanish.md">🇪🇸 Leer</a> <a href="https://github.com/desko27/zoomcommander/readme/README.brazilian-portuguese.md">🇧🇷 Leia</a>
</p>

<p align="center">
  <img height="128" width="128" src="https://user-images.githubusercontent.com/4168389/90338769-53d58700-dfec-11ea-8e89-cda93da1f911.png">
</p>

<p align="center">
  🖥🎤 <strong>Practical help for managing audio and screen sharing</strong>
  <br><a href="https://github.com/desko27/zoomcommander/releases/latest">⏬ Download now</a>
</p>

<p align="center">
🛎 One click for everything - seriously!
<br>💡 Clear vision of the situation
<br>🤚 Drag participants
<br>🔍 Flexible search
<br>✏️ Add your notes
<br>... and more
</p>

![Zoom Commander](https://user-images.githubusercontent.com/4168389/90339412-e415cb00-dff0-11ea-9729-ddace3ede88f.png)

# What is Zoom Commander

By using Zoom Commander you can join a Zoom meeting and have two different windows running at the same time:

- The original Zoom application.
- An additional control panel (previous image).

In this control panel, you will have functions that simplify the management of a very specific meeting model - in which there is a role of president, a platform where different conference-style participations take place and an audience that raises its hand to provide comments— where every audio transition is orchestrated by a manager (namely you) who mutes and un-mutes as needed, shares screen, etc.

Please, if the kind of meetings you have in Zoom does not look like this, do not use Zoom Commander, because it is not designed to offer another kind of solution.

It should be noted that the development kit on which it is based (Electron Zoom SDK) imposes a series of limitations that cannot be solved right now. This does not prevent Zoom Commander from being helpful, but you can find them at the end of the document.

# How each block works

## The *Everyone* block

Provides a list of all meeting participants, including you. It is the block closest to the standard Zoom participant list.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90339508-77e79700-dff1-11ea-9882-9b864e138519.png">

### User filter

It works by similarity algorithm, so no capital letters or misspelled ones will prevent you from finding the user you are looking for.

### Click to the user

🖱 **Give comment** (see block explanation *Comments*).

<img width="250" src="https://user-images.githubusercontent.com/4168389/90340180-98662000-dff6-11ea-891a-fdc1c850056b.png">

The icon that appears when hovering over with the mouse indicates the action that will be done on the user if we click.

The actions we can do will depend on the block where we are, but they will always be indicated by the icon that we will see. Almost all blocks allow alternative actions if we hold down any of these keys: <kbd>Ctrl</kbd> &nbsp; <kbd>Shift</kbd> &nbsp; <kbd><</kbd>

In the *Everyone* block the actions are:

🖱 Give comment (see block explanation *Comments*)
<br/><kbd>Ctrl</kbd> + 🖱 Give/remove audio (simple)
<br/><kbd><</kbd> + 🖱 Add to *Queue*

### Drag users

Participants can be dragged to other lists mentioned below, to have more vision and control of certain groups.

### Buttons

Some blocks have buttons in their upper right corner.

In this case, both serve to "refresh" user information, to different degrees. Most likely, you will never need to use them, but they are there in case inconsistencies occur between the user list of the original Zoom interface and the Zoom Commander interface (in known and very specific cases due to the aforementioned limitations of the Zoom SDK) .

<kbd>Reset</kbd> Asks Zoom again for the list of users and leaves the interface as if you had just entered the meeting. It is the most aggressive "reloading".

<kbd>Sync</kbd> Asks Zoom again for the information of the users that are already being shown, but keeps the interface with any changes you have made so far.

## The *Audio* block

Here you can see who has the mic open real time. No more checking one by one making sure that no one who should not have audio has no audio.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340061-bf702200-dff5-11ea-9a08-6dd3c1ab93e9.png">

### Click the user

The audio is **immediately removed**, that is, it is muted, and therefore disappears from this list.

There are no additional actions.

### Buttons

<kbd> Activate shield </kbd> **Warning: DO NOT ACTIVATE IT if you are not going to actively manage the *President*, *Platform* and *Commenting* blocks during the meeting, because with the shield activated ONLY the participants who are in those blocks will be able to receive audio, no one else.** This button activates an "anti-spontaneous" shield that automatically and immediately silences any user who receives audio illegitimately (a clueless host, someone who accepts the audio later, etc), so he/she won't have time to interrupt. This works thanks to the fact that the users considered legitimate are those who are in President*, *Platform* or *Commenting*, the rest are illegitimate. As long as the shield is active, the button will be green. Click again to deactivate it.

<kbd>Mute all</kbd> silences all users, and also enables the relevant options so that no one has permission to unmute (current participants or those who join later). It makes sense to use it at the beginning of the meeting, although for that there is another button in the sidebar that does this and a few other things.

## The *Queue* block

Here you can drag any participant who has a part of the meeting, so that you can have it prepared for later. Also, you should know that by right clicking on someone you can add notes like the one you can see in the image.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340630-e4669400-dff9-11ea-87aa-e5a39932fdf9.png">

### Click to the user

🖱 **Move to *Platform***, he/she will also receive audio while it is removed for the rest.

<kbd>Ctrl</kbd> + 🖱 Give/remove audio (simple)
<br/><kbd>Shift</kbd> + 🖱 Remove from the *Queue*
<br/><kbd><</kbd> + 🖱 Move to *Platform*, but without giving or removing audio to anyone.

### Drag users

Dragging a user back to *Everyone* will remove it from *Queue*. Furthermore, you can also sort the *Queue* users by dragging them together.

## The *Platform* and *President*

The interesting thing about these blocks, unified by the yellow color, is that clicking on a user will give them audio and the others will be automatically silenced. This is convenient to, for example, give way to the *President* with a single click, without having to worry about manually silencing whoever had the previous part. It's just as convenient to switch audio between different *Platform* participants, regardless of the number.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90340876-5d1a2000-dffb-11ea-9bbb-09435266a51f.png">

### Click to the user

🖱 **Give audio** and remove from the rest

<kbd>Ctrl</kbd> + 🖱 Give/remove audio (simple)
<br/><kbd>Shift</kbd> + 🖱 Remove from the block

### Drag users

We can move them freely.

## The blocks *Commenting* and *Comments*

All participants who raise their hands will appear in the *Comments* block (the one below). The upper block in green shows the participant who has been selected to comment, so that it is visible and thus can be removed from there when finished.

<img align="left" width="250" src="https://user-images.githubusercontent.com/4168389/90341062-a7e86780-dffc-11ea-9e9a-8b2bb05911ad.png">

### Click to the user

🖱 **Give comment.** Several things will happen: the user will be given audio and it will be shown in the green area. Hands will be lowered automatically **only** when his/her audio is activated. This means that if his/her audio never gets activated, we can remove it from there by clicking it while the rest continue with their hand raised and we can select another participant.

<kbd>Ctrl</kbd> + 🖱 Give/remove audio (simple)

### Buttons

<kbd>Clean up</kbd> Lowers all hands.

<kbd>History</kbd> Change the view of the block to the history of raised hands. This can help if we have mistakenly lowered hands and need to give comment to someone who was raising it up.

# How the sidebar works

## Start meeting

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341330-031b5980-dfff-11ea-9c1d-893e1ce4e4aa.png">

By clicking this button, the following chain of actions will happen in just 1 or 2 seconds automatically:

1. The anti-spontaneous shield is activated.
1. All participants are muted.
2. The relevant options are configured so that no one has permission to unmute (current participants or those who join later).
3. Screen sharing is stopped (if it is being carried out).
4. Audio is given to the *President*.

## Share window immediately

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341328-0282c300-dfff-11ea-9039-bd44e67e4c50.png">

**Keyboard shortcut** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>

**Important: to be able to share videos WITH AUDIO, you must share screen from Zoom's original interface AT LEAST ONCE PER MEETING by checking the "share computer sound" box.** You can do this before the meeting starts, this way you will be able to use this button during the meeting (or keyboard shortcut) to share both images and videos, and Zoom will remember to share the sound every time.

This button immediately shares a window previously configured. This is useful since generally the same program is always shared and it does not make sense to go through the options that the original Zoom interface forces you to go through.

It comes preconfigured to share [the Media Portal Portal](https://github.com/desko27/mediaportal/blob/master/README.md), but if you don't use Media Portal, you can change the target window by right clicking on the button. The settings you apply will be saved and kept in future Zoom Commander sessions. For example, to use JW Library you can enter `ApplicationFrameHost.exe/JW Library` in the configuration.

## Stop sharing

<img width="40" src="https://user-images.githubusercontent.com/4168389/90341327-01ea2c80-dfff-11ea-8d57-a725b0fbcc4c.png">

**Keyboard shortcut** &nbsp;
<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>0</kbd>

Stops screen sharing. It does nothing different than the original Zoom button, except for the fact that it has a new keyboard shortcut (which expressly matches one of Media Portal, to stop showing the image or video on the portal).

# Known limitations

The Electron Zoom SDK development kit is missing a number of functionalities that impose limitations on Zoom Commander:

## Mute everyone
If you silence everyone using Zoom Commander there is no problem, but if another host launches "silence everyone" you will not see it reflected in the state of the participants within Zoom Commander (many will continue to appear as if they have audio even if they do not). If that happens, just click the <kbd>Sync</kbd> button in the *Everyone* block to refresh the status of the participants. In general, this limitation will not be a problem because no one other than the person using the Zoom Commander should launch a "silence everyone".

## Lower all hands
In a similar way to the above, if you lower all the hands using Zoom Commander there is no problem (<kbd>Clean up</kbd> button), but if another host "lowers all hands" you will not see it reflected in the *Comments* column by Zoom Commander. In general, this limitation will not be a problem either because no one other than the person using the Zoom Commander should "lower all hands".

## Additional rooms
Electron Zoom SDK has no means of knowing if we move between additional meeting rooms. To correctly see the list of participants once we join an additional room, we will have to use the <kbd>Reset</kbd> button.
