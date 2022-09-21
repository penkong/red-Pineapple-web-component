# Website Ad Video Player

## Product and technical description
At Red Pineapple Media, being able to play video advertisements in the browser is crucial.
We cooperate with bloggers and make sure they can monetize their content by playing video ads on their websites.
I am sure most of us experienced this in our lives while reading yet another blog or watching a video on youtube.
In the offline challenge code interview phase, we kindly ask you to design and implement a video ad player that can play videos in the browser.
 
Inside the repo you’ll find a demo blog in a dir called `demo-blog`.
You’ll need to integrate your video player implementation with our demo blog. If you check out the source code there are some useful integration comments in the index.html, use them as hints.

We ask bloggers to add our js script and a simple snippet (sometimes we call it tag) on their website so they can control where the ads should be shown on their websites. It’s up to the bloggers how many ads they want to show on their pages.
For example, this is representing a tag where a video ad should be played when someone opens the page in the browser:
```
<rpm-video data-src="http://video.redpm.net/videos/6482_M.mp4" data-quartile-tracker="http://test.track/viewtime?quartile=${quartile}" />
```
In this case, this means that our video player should be shown in the same html element that contains this custom rpm-video html tag.
The `data-src="http://video.redpm.net/videos/6482_M.mp4"` indicates the source of the video to play.
The visitor of the website should be able to pause/resume the video playing.
The video player should show a progress bar at the bottom, the visitor shouldn’t be able to interact with the progress bar, it's just an indication of the progress of the playing video.
We try to deliver the same user experience in different browsers so we would like that play/pause and progress bar style to have the same look across different browsers.

We also need to collect some statistics and understand how well the ad is performing.
We use a tracking technique called video quartiles for that.
If the tag has an `data-quartile-tracker` attribute then we need to fire a http request to the url provided as a value for this attribute. We need to call this url when:

*  Player started to play the video
*  When the player played 25% of the video length
*  When the player played 50% of the video length
*  When the player played 75% of the video length
*  When the player played 100% of the video length

The provided url is a template url in which the ${quartile} should be replaced with the actual percent value (0,25,50,75,100)

We don’t need to worry about dynamic responsiveness for now. Just keep in mind that different bloggers have different sizes for the slots for video ads.

When you build this task please consider this as a real product that should serve real visitors. 
Please, refrain from using any frameworks like react, angular or others that define the project structure or force you to follow any rules or conventions. 
We would like to assess your ability to organise the code and define the project conventions. 
It’s totally acceptable to use utility libraries like underscore/lodash or others that are easily interchangeable and don’t take the fundamental decisions for you.
What we as a team care about:
* Working solution
* Concise and easy-to-follow code
* Easy to maintain and intuitive approach

## How to submit your solution
We've created this repository for you, that's why you can simply commit your changes and let us know when the solution is ready for review. All your work is kept confidential, only the company members have access.
We understand that providing the solution can take some time, but we hope you will have some fun and in the end this is also an oportunity for you to try and learn new things.
We will appreciate if you can submit your solution within 2 weeks, in case you need more time please let us know.
We kindly ask you to not upload your solution to public repositories in GitHub, BitBucket, etc.

## Next steps
In the next step of our interview after you submit this challenge, we would like to have a code review and live coding session where we can work together to add a new feature to your implementation. It shouldn't take longer than 90min.
This feature will be the ability to play any youtube video. Many of our clients use it to host their videos and playing straight from youtube earns them additional views. The aspect ratio for youtube videos is always 16:9.
Youtube has a simple api for embedded videos that we can use: [https://developers.google.com/youtube/iframe_api_reference](https://developers.google.com/youtube/iframe_api_reference)
We ended up using this playerVars, maybe this can also be helpful for you:
```
{
  autoplay: 0,
  controls: 0,
  iv_load_policy: 3,
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
  wmode: "transparent",
  playsinline: 1
}
```
Again we don’t require you to submit the youtube integration, we will explore this part during our live session so you can also experience and get a feeling of how we work together.

If you have questions or concerns you are more than welcome to reach us.
We hope you have fun :)