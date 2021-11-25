import("music.lib");

btn1 = button("Button1[OWL:B1]");
led1 = hbargraph("LED2>[OWL:B1]", 0, 1);

process = attach(osc(220) * btn1, 1-btn1 : led1) <: _, _;
