# Running locally
run `npm install` on your command line, and then `npm run dev`
# About de project
This project is about creating crowdfunding campaigns, that allow people to be part of the decisions made for the project, directly.
On this website, the user would have the opportunity to explore two different roles: Owner or Contributor. Anybody can take any role, so if someone has an idea, a startup, or a cause that needs money raising, it can become an `owner`.
### The Owner
This role has one principal action that defines its role: The creation of a campaign. From now on, anyone can see that campaign and send an amount of ether, that is above the minimum contribution criteria set by the owner at the moment of creating the campaign.
The owner also is responsible for kicking off spending requests. These requests can only be created by the owner's address and will be in a pending stage until +50% of contributors approve that request.
This prevents money to be sent to a mysterious address or taking away the full balance for uses not related to that campaign cause.
The owner can also finalize the request, which means, trying to confirm the transaction that was established at the time that the request was created. This will only succeed if the amount of approvers is greater than half of the total contributors.
This declares the `contributor` as a key role in the development of the campaign and funds movements.
### The Contributor
You can send any amount of money to the campaign you like. But that doesn't make you a contributor until you transfer more than the minimum amount declared at the creation of the campaign.
So when you achieve passing that condition, you are added to the Contributor's list. For the creation of a request, all contributors are set as non-approver contributors. And only when they vote affirmatively for the request, they are counted as one more individual on the approver's list.
### Final words
This application lets people raise money without having a single intermediary, and also working with people they don't know, taking the trust barrier to a new paradigm. This involves a new system where there are no trust entities, but the trust itself is on top of the technology the application was built with.
The meaning of consensus is so powerful, that is a simple math rule that defines if the money of all of us will be well spent. We all know that some people take advantage of other people, raising money and running away with it. But together, where every single one of us has the same weight on the scale to define money's destiny, cooperation and consensus allow us to us experiment a world where we go beyond those personal interests, and as a majority, the future would be only the one that we deserve as humanity.
