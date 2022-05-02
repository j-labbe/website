import CMS from "netlify-cms-app";
import { TagInput, TagPreview } from "../components/TagWidget";

CMS.registerWidget('tags', TagInput, TagPreview);
CMS.registerPreviewStyle('/TagWidget.css');