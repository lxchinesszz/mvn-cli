package com.idea.sass.dal.model.entity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Map;
import java.util.Date;

/**
 * @author jmvn-cli
 **/
@TableName(value = "sales_estimate", autoResultMap = true)
public class SalesEstimateDO implements Serializable {

    private static final long serialVersionUID = 1L;
    
   /**
    * 
    **/
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    public Long id;
    
   /**
    * 预估名称
    **/
    public String title;
    
   /**
    * 状态：0草稿 1提交
    **/
    public Integer status;
    
   /**
    * 采购计划Id
    **/
    public Long purchasePlanId;
    
   /**
    * 扩展字段
    **/
    public Map expandField;
    
   /**
    * 数据锁定：0未锁定 1已锁定
    **/
    public Integer locking;
    
   /**
    * 下载地址
    **/
    public String ossUrl;
    
   /**
    * 品牌id
    **/
    public Long purchaseBrandId;
    
   /**
    * 品牌组ID
    **/
    public Long brandGroupId;
    
   /**
    * 品牌code
    **/
    public String brandCode;
    
   /**
    * 逻辑删除 0否 1是   默认0
    **/
    public Integer delFlag;
    
   /**
    * 创建时间
    **/
    public Date gmtCreate;
    
   /**
    * 创建人Id
    **/
    public Long createrId;
    
   /**
    * 更新时间
    **/
    public Date gmtModify;
    
   /**
    * 修改人Id
    **/
    public Long modifierId;
    
   
   /**
    * @param id 
    **/
    public void setId(Long id){
        this.id = id;
    }

   /**
    * @return Long 
    **/
    public Long getId(){
        return id;
    }
   
   /**
    * @param title 预估名称
    **/
    public void setTitle(String title){
        this.title = title;
    }

   /**
    * @return String 预估名称
    **/
    public String getTitle(){
        return title;
    }
   
   /**
    * @param status 状态：0草稿 1提交
    **/
    public void setStatus(Integer status){
        this.status = status;
    }

   /**
    * @return Integer 状态：0草稿 1提交
    **/
    public Integer getStatus(){
        return status;
    }
   
   /**
    * @param purchasePlanId 采购计划Id
    **/
    public void setPurchasePlanId(Long purchasePlanId){
        this.purchasePlanId = purchasePlanId;
    }

   /**
    * @return Long 采购计划Id
    **/
    public Long getPurchasePlanId(){
        return purchasePlanId;
    }
   
   /**
    * @param expandField 扩展字段
    **/
    public void setExpandField(Map expandField){
        this.expandField = expandField;
    }

   /**
    * @return Map 扩展字段
    **/
    public Map getExpandField(){
        return expandField;
    }
   
   /**
    * @param locking 数据锁定：0未锁定 1已锁定
    **/
    public void setLocking(Integer locking){
        this.locking = locking;
    }

   /**
    * @return Integer 数据锁定：0未锁定 1已锁定
    **/
    public Integer getLocking(){
        return locking;
    }
   
   /**
    * @param ossUrl 下载地址
    **/
    public void setOssUrl(String ossUrl){
        this.ossUrl = ossUrl;
    }

   /**
    * @return String 下载地址
    **/
    public String getOssUrl(){
        return ossUrl;
    }
   
   /**
    * @param purchaseBrandId 品牌id
    **/
    public void setPurchaseBrandId(Long purchaseBrandId){
        this.purchaseBrandId = purchaseBrandId;
    }

   /**
    * @return Long 品牌id
    **/
    public Long getPurchaseBrandId(){
        return purchaseBrandId;
    }
   
   /**
    * @param brandGroupId 品牌组ID
    **/
    public void setBrandGroupId(Long brandGroupId){
        this.brandGroupId = brandGroupId;
    }

   /**
    * @return Long 品牌组ID
    **/
    public Long getBrandGroupId(){
        return brandGroupId;
    }
   
   /**
    * @param brandCode 品牌code
    **/
    public void setBrandCode(String brandCode){
        this.brandCode = brandCode;
    }

   /**
    * @return String 品牌code
    **/
    public String getBrandCode(){
        return brandCode;
    }
   
   /**
    * @param delFlag 逻辑删除 0否 1是   默认0
    **/
    public void setDelFlag(Integer delFlag){
        this.delFlag = delFlag;
    }

   /**
    * @return Integer 逻辑删除 0否 1是   默认0
    **/
    public Integer getDelFlag(){
        return delFlag;
    }
   
   /**
    * @param gmtCreate 创建时间
    **/
    public void setGmtCreate(Date gmtCreate){
        this.gmtCreate = gmtCreate;
    }

   /**
    * @return Date 创建时间
    **/
    public Date getGmtCreate(){
        return gmtCreate;
    }
   
   /**
    * @param createrId 创建人Id
    **/
    public void setCreaterId(Long createrId){
        this.createrId = createrId;
    }

   /**
    * @return Long 创建人Id
    **/
    public Long getCreaterId(){
        return createrId;
    }
   
   /**
    * @param gmtModify 更新时间
    **/
    public void setGmtModify(Date gmtModify){
        this.gmtModify = gmtModify;
    }

   /**
    * @return Date 更新时间
    **/
    public Date getGmtModify(){
        return gmtModify;
    }
   
   /**
    * @param modifierId 修改人Id
    **/
    public void setModifierId(Long modifierId){
        this.modifierId = modifierId;
    }

   /**
    * @return Long 修改人Id
    **/
    public Long getModifierId(){
        return modifierId;
    }
   
    @Override
    public String toString() {
        return "SalesEstimateDO{" +
          ",id=" + this.id + 
          ",title=" + this.title + 
          ",status=" + this.status + 
          ",purchasePlanId=" + this.purchasePlanId + 
          ",expandField=" + this.expandField + 
          ",locking=" + this.locking + 
          ",ossUrl=" + this.ossUrl + 
          ",purchaseBrandId=" + this.purchaseBrandId + 
          ",brandGroupId=" + this.brandGroupId + 
          ",brandCode=" + this.brandCode + 
          ",delFlag=" + this.delFlag + 
          ",gmtCreate=" + this.gmtCreate + 
          ",createrId=" + this.createrId + 
          ",gmtModify=" + this.gmtModify + 
          ",modifierId=" + this.modifierId + 
        "}";
    }
}
