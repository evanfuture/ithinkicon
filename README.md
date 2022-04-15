# I Think Icon

## eg. "I think I can, I think I can" 🚋

I finally moved my side project's icon system into a standalone lib today, and thought I would share it with you all.

The setup I use, which I really like, is a single svg added to the html body, and each icon is defined in that svg's defs as a symbol. Then, whenever I want to use an icon, I can just do something like `<svg class="h-3 w-3"><use xlink:href="#dm-moon"></use></svg>`.

What bothered me about it was that there was no type safety around the icon names. So, if I misspelled "moon", it wouldn't work. So, I made an Angular Module that will automatically add the root level svg just the once, and then lets me use `<dm-icon class="h-3 w-3" icon="moon"></dm-icon>` for the icon, and the icon input is correctly typed with what's available.

--

To be clear, I'm not publishing this as its own package, and you shouldn't just blindly copy and paste. This is an example that you can borrow from and improve upon!

To that end, I'm sure there's an alternate approach here. Would you consider making a PR to change something? Here are some thoughts I have for changing/improving:

- We depend on the Angular CDK, but do we even need to?
- Is the Module constructor a safe place to call the creation service?
- Is there a way to get get around the deprecated `ComponentFactoryResolver` that seems to be required for using `DomPortalOutlet`?
- How would you write tests for this kind of funtionality?
